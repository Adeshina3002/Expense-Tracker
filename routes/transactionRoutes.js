const express = require('express')
const { createTransaction, getAllRecords, getTransaction, deleteRecord, updateRecord } = require('../controllers/transactionController')
const router = express.Router()

router.post('/', createTransaction)
router.get('/', getAllRecords)
router.get('/record/:id', getTransaction)
router.get('/record/:id', updateRecord)
router.delete('/record/:id', deleteRecord)

module.exports = router