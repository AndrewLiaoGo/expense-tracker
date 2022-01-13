const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      for (let record of records) {
        record.date = record.date.toISOString().split('T')[0]
      }
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router
