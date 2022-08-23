// handle get and post req

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.post('/', homeController.createTask)

module.exports = router