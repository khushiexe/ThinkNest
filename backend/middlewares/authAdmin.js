import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // CHANGED HERE: Declare as completely lowercase 'atoken'
        const atoken = req.headers.atoken;

        // Now this matches perfectly!
        if (!atoken) {
            return res.json({
                success: false,
                message: "Not Authorized Please Login again"
            })
        }

        // This matches perfectly too!
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not Authorized login again"
            })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authAdmin