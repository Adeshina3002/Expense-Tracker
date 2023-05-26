const createUserPayload = (user) => {
    return {
        userID : user._id,
        email : user.email
    }
}

module.exports = {
    createUserPayload
}