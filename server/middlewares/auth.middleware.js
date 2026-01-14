import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.adminId = decode.adminId;
        next();
    } catch (error) {
        console.error("token not valid");
        return res.status(401).json({

            success: false,
            message: "Invalid token"
        })
    }


}