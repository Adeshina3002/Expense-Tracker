const { StatusCodes } = require('http-status-codes')
const Transaction = require('../models/transaction')

// Fetch all transaction records
const getAllRecords = async (req, res, next) => {
    try {
        const transactionRecords = await Transaction.find({}).sort({ createdAt: -1 })

        if (!transactionRecords) {
            res.status(StatusCodes.NOT_FOUND).json({ status: "Not Found", message: "You don't have any records to show at the moment" })
        }

        res.status(StatusCodes.OK).json({ status: "Success", data: transactionRecords })
    } catch (error) {
        next(error.message)
    }
}

// get a single record
const getTransaction = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id || id.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: "Error", message: "Please select a record to show" })
        }

        const record = await Transaction.findOne({ _id: id })

        if (!record) {
            res.status(StatusCodes.NOT_FOUND).JSON({ status: 'Not Found', message: "Not record for this transaction" })
        }

        res.status(StatusCodes.OK).json({ status: "Success", data: record })
    } catch (error) {
        // next(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({ status: "Error", message: error.message })
    }
}

// create transaction record
const createTransaction = async (req, res, next) => {
    try {
        const { amount, description, date } = req.body

        if (!amount || !description || !date) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: 'Error', message: error.message })
        }

        const expense = new Transaction({
            amount,
            description,
            date
        })

        const savedExpense = await Transaction.create(expense)
        res.status(StatusCodes.CREATED).json({ status: "success", message: "Transaction record created successfully", savedExpense })
    } catch (error) {
        // next(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({status: 'Error', message: error.message })
    }
}

// Update record
const updateRecord = async (req, res) => {
    try {
        const { id } = req.params

        const record = await Transaction.findOne({ _id: id })

        if (!record) {
            res.status(StatusCodes.NOT_FOUND).json({ status: "Not found", message: "Record not found"})
        }

        const recordUpdate = await Transaction.updateOne({ _id: id}, { $set: req.body })
        res.status(StatusCodes.OK),json({ status: "success", message: "Record updated successfully" })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({status: "error", message: error.message })
    }
}


// Delete transaction record
const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id || id.length < 24) {
            res.status(StatusCodes.BAD_REQUEST).json({status: "Bad Request", message: "Invalid! Select a record to delete"})
        }

        const data = await Transaction.findOne({ _id: id })

        if (!data) {
            res.status(StatusCodes.NOT_FOUND).json({ status: "Not Found", message: "No record found..." })
        }

        await Transaction.deleteOne(data)
        res.status(StatusCodes.OK).json({ status: "Success", message: "Record deleted successfully" })
    } catch (error) {
        next(error.message)
        res.status(StatusCodes.BAD_REQUEST).json({ status: "Bad Request", message: error.message })
    }
}

module.exports = {
    createTransaction,
    getAllRecords,
    getTransaction,
    updateRecord,
    deleteRecord
}