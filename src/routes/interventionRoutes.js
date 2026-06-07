const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createIntervention,
    getInterventions,
    getIntervention,
    updateIntervention,
    deleteIntervention
} = require("../controllers/interventionController");

router.get("/", authMiddleware, getInterventions);

router.post("/", authMiddleware, createIntervention);

router.get("/:id", authMiddleware, getIntervention);

router.put("/:id", authMiddleware, updateIntervention);

router.delete("/:id", authMiddleware, deleteIntervention);

module.exports = router;