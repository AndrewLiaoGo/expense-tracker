const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_RECORD = [{
  name: "午餐",
  amount: 60,
  date: "2019-04-23",
  categoryId: 4
},
{
  name: "晚餐",
  amount: 60,
  date: "2019-04-23",
  categoryId: 4
},
{
  name: "捷運",
  amount: 120,
  date: "2019-04-23",
  categoryId: 2
},
{
  name: "租金",
  amount: 25000,
  date: "2019-04-01",
  categoryId: 1
},
{
  name: "電影：驚奇隊長",
  amount: 220,
  date: "2019-04-23",
  categoryId: 3
}]

db.on('error', () => console.log('mongoose error!'))
db.once('open', () => {
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: SEED_RECORD.length },
        (_, i) => {
          return Record.create({
            name: SEED_RECORD[i].name,
            date: SEED_RECORD[i].date,
            amount: SEED_RECORD[i].amount,
            userId,
            categoryId: SEED_RECORD[i].categoryId
          })
        }))
    })
    .then(() => {
      console.log('record seed done.')
      process.exit()
    })
})