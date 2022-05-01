const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  records: [
    {
      name: "午餐",
      amount: 60,
      date: "2019-04-23",
      category: "餐飲食品"
    },
    {
      name: "晚餐",
      amount: 60,
      date: "2019-04-23",
      category: "餐飲食品"
    },
    {
      name: "捷運",
      amount: 120,
      date: "2019-04-23",
      category: "交通出行"
    },
    {
      name: "租金",
      amount: 25000,
      date: "2019-04-01",
      category: "家居物業"
    },
    {
      name: "電影：驚奇隊長",
      amount: 220,
      date: "2019-04-23",
      category: "休閒娛樂"
    }
  ]
}

db.on('error', () => console.log('mongoose error!'))
db.once('open', () => {
  User
    .findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('User exists.')
        return user
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
    })
    .then(user => {
      return Promise.all(Array.from(SEED_USER.records, record => {
        return Category
          .findOne({ name: record.category })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('record seed done.')
      process.exit()
    })
})