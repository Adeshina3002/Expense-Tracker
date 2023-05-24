const express = require('express')
const { createTransaction, getAllRecords, getTransaction, deleteRecord } = require('../controllers/transactionController')
const router = express.Router()

router.post('/', createTransaction)
router.get('/', getAllRecords)
router.get('/record/:id', getTransaction)
router.delete('/record/:id', deleteRecord)

module.exports = router