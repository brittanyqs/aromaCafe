const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔥 REGISTRO
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Usuario ya existe" });
        }

        const role = email === "admin@cafe.com" ? "admin" : "user";

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.json(newUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 🔥 LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no existe" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;