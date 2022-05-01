if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categories = [
  {
    id: 1,
    name: '家居物業',
    icon: "https://fontawesome.com/icons/home?style=solid"
  },
  {
    id: 2,
    name: '交通出行',
    icon: "https://fontawesome.com/icons/shuttle-van?style=solid"
  },
  {
    id: 3,
    name: '休閒娛樂',
    icon: "https://fontawesome.com/icons/grin-beam?style=solid",
  },
  {
    id: 4,
    name: '餐飲食品',
    icon: "https://fontawesome.com/icons/utensils?style=solid",
  },
  {
    id: 5,
    name: '其他',
    icon: "https://fontawesome.com/icons/pen?style=solid"
  }
]

db.once('open', async () => {
  for (let category of categories) {
    await Category.create(category)
  }
  console.log('category seed done.')
  process.exit()
})
