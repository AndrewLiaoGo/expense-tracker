const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.post('/', (req, res) => {
  const { name, date, amount } = req.body
  return Record.create({ name, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

module.exports = router
