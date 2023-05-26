const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_LIFETIME
    })
    return token
}

const jwtTokenValidation = async (req, res, next) => {
    try {
        // access auth header to validate token
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new Error ("Invalid authorization header")
        }

        const token = authHeader.split(" ")[1]

        // retrieve user details from from (logged-in user)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);

        req.user = {
            userID : decodedToken.userID,
            email : decodedToken.email 
        }

        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ status: "error", message: "Authentication failed!" })
    }
}

const attachCookiesToResponse = ({res, user}) => {
    const token = createJWT({ payload: user })
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Enable secure flag for HTTPS
        sameSite: 'strict', // Apply same-site policy
        expires: new Date( Date.now() + oneDay ),
        signed: true
    })
    return token 
}

module.exports = {
    createJWT,
    jwtTokenValidation,
    attachCookiesToResponse
}