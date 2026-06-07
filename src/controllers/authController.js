const Mechanic = require("../models/Mechanic");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await Mechanic.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email já existe"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const mechanic = await Mechanic.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "Utilizador criado",
            mechanic
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const mechanic = await Mechanic.findOne({ email });

        if (!mechanic) {
            return res.status(404).json({
                message: "Utilizador não encontrado"
            });
        }

        const validPassword = await bcrypt.compare(password, mechanic.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Password inválida"
            });
        }

        const token = jwt.sign(
            {
                id: mechanic._id,
                role: mechanic.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login efetuado",
            token
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.profile = async (req, res) => {

    try {

        const mechanic = await Mechanic.findById(req.user.id).select("-password");

        res.json(mechanic);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};