if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', async () => {
  await Record.create({
    name: '午餐',
    date: '2019.4.23',
    amount: 60
  })
  console.log('record seed done.')
  process.exit()
})
