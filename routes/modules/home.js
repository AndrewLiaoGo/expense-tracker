const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find({})
    .lean()
    .sort({ _id: 'asc' })
    .then()
    .catch(error => console.error(error))
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      for (let record of records) {
        record.date = record.date.toISOString().split('T')[0]
        
        totalAmount += record.amount
      }
      res.render('index', { categories, records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router
