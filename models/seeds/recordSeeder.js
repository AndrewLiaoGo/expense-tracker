if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', async () => {
  const hashedPassword = await bcrypt.hash(SEED_USER.password, 10)
  const userId = await User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: hashedPassword
  }).then((users) => {
    return users._id
  })
  await Record.create([{
    name: '午餐',
    date: '2019.4.23',
    amount: 60,
    userId
  }, {
    name: '晚餐',
    date: '2019.4.23',
    amount: 60,
    userId
  }, {
    name: '捷運',
    date: '2019.4.23',
    amount: 120,
    userId
  }, {
    name: '電影：驚奇隊長',
    date: '2019.4.23',
    amount: 220,
    userId
  }, {
    name: '租金',
    date: '2015.4.01',
    amount: 25000,
    userId
  }])
  console.log('record seed done.')
  process.exit()
})