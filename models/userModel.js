const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your firstName"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide your lastName"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: [true, "Provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide your password"]
    },
},
    {timestamps: true}
)

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}


module.exports = mongoose.model('User', userSchema)