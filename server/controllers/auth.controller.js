import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        // if email or password is not provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // checking for admin if it exists or not
        const findAdmin = await pool.query("SELECT * FROM admin WHERE email=$1", [email])
        if (findAdmin.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Creds"
            })
        }

        const adminFound = findAdmin.rows[0];

        // checking for password
        if (adminFound.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid creds"
            })
        }

        // everything goes well then we will be generating token 
        const token = jwt.sign(
            { adminId: adminFound.id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" }
        )

        res.json({
            success: true,
            message: "Login successful",
            token
        })

    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        })
    }


}