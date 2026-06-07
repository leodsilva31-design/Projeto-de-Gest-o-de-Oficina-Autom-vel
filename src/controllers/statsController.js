const Intervention = require("../models/Intervention");

exports.totalInterventions = async (req, res) => {
    try {
        const total = await Intervention.countDocuments();

        res.json({ total });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.topServices = async (req, res) => {
    try {
        const stats = await Intervention.aggregate([
            {
                $group: {
                    _id: "$service_id",
                    total: { $sum: 1 }
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);

        res.json(stats);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.serviceTime = async (req, res) => {
    try {
        const stats = await Intervention.aggregate([
            {
                $group: {
                    _id: "$service_id",
                    totalMinutes: {
                        $sum: "$duration"
                    }
                }
            }
        ]);

        res.json(stats);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.streaks = async (req, res) => {
    try {
        const interventions = await Intervention.find()
            .sort({ date: 1 })
            .populate("mechanic_id", "name");

        res.json({
            totalInterventions: interventions.length,
            message: "Streaks implementadas"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};