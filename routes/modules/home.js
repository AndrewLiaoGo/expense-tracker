const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  const filteredValue = req.query.categoryFilter
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      return Category.find()
        .lean()
        .then((categories) => {
          let filteredRecords = records
          let totalAmount = 0
          let filteredAmount = 0
          let amountArray = []

          records.forEach(record => {
            const categoryId = record.categoryId
            record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
            record.date = record.date.toISOString().split('T')[0]
            totalAmount += record.amount
          })

          if (filteredValue) {
            if (filteredValue !== "0") {
              filteredRecords = records.filter(item => item.categoryId.equals(filteredValue))
              amountArray = records.filter(item => item.categoryId.equals(filteredValue))
              amountArray.forEach(item => filteredAmount += item.amount)
              totalAmount = filteredAmount
            }
          }

          return res.render('index', { records: filteredRecords, categories, totalAmount })
        })
        .catch(error => console.error(error))
    })
})

module.exports = router
