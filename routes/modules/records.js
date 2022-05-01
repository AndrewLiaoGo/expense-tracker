const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, categoryId } = req.body
  return Record.create({ name, date, amount, userId, categoryId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  const category = []
  Category.find()
    .lean()
    .then(data => {
      data.forEach(item => {
        category.push(item)
      })
      return res.render('new', { category })
    })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      const categoryId = record.categoryId
      return Category.find()
        .lean()
        .then(categories => {
          const category = categories.filter(category => category._id.equals(categoryId))[0]
          record.date = record.date.toISOString().split('T')[0]
          res.render('edit', { record, category, categories })
        })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  console.log(req.body)
  const { name, date, amount, categoryId } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = categoryId
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
