import jwt from "jsonwebtoken";
import users from "../models/auth.js";

export const login = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            // If the user doesn't exist, create a new one
            try {
                const newUser = await users.create({ email });

                const token = jwt.sign(
                    { email: newUser.email, id: newUser._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(201).json({ result: newUser, token });
            } catch (error) {
                console.error("Error creating new user:", error);
                res.status(500).json({ message: "Something went wrong while creating the user." });
            }
        } else {
            // User already exists, generate token for login
            const token = jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Something went wrong during login." });
    }
};
