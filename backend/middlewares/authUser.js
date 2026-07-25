import jwt from "jsonwebtoken"

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        // CHANGED HERE: Declare as completely lowercase 'atoken'
        const {atoken} = req.headers; 

        // Now this matches perfectly!
        if (!atoken) {
            return res.json({
                success: false,
                message: "Not Authorized Please Login again"
            })
        }

        // This matches perfectly too!
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        req.userId = token_decode.id ;

        next()

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authUser ;