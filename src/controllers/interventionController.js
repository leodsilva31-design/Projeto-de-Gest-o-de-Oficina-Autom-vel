const Intervention = require("../models/Intervention");

exports.createIntervention = async (req, res) => {
    try {
        const intervention = await Intervention.create(req.body);

        res.status(201).json(intervention);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInterventions = async (req, res) => {
    try {
        const interventions = await Intervention.find()
            .populate("mechanic_id", "name email")
            .populate("service_id", "name");

        res.json(interventions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIntervention = async (req, res) => {
    try {
        const intervention = await Intervention.findById(req.params.id)
            .populate("mechanic_id", "name email")
            .populate("service_id", "name");

        if (!intervention) {
            return res.status(404).json({
                message: "Intervenção não encontrada"
            });
        }

        res.json(intervention);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateIntervention = async (req, res) => {
    try {
        const intervention = await Intervention.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!intervention) {
            return res.status(404).json({
                message: "Intervenção não encontrada"
            });
        }

        res.json(intervention);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteIntervention = async (req, res) => {
    try {
        const intervention = await Intervention.findByIdAndDelete(req.params.id);

        if (!intervention) {
            return res.status(404).json({
                message: "Intervenção não encontrada"
            });
        }

        res.json({
            message: "Intervenção eliminada"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};