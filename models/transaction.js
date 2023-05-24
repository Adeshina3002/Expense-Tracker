const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: new Date 
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Transaction", transactionSchema)