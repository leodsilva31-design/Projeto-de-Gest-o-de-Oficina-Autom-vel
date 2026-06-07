const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    totalInterventions,
    topServices,
    serviceTime,
    streaks
} = require("../controllers/statsController");

router.get("/interventions-total", authMiddleware, totalInterventions);

router.get("/top-services", authMiddleware, topServices);

router.get("/service-time", authMiddleware, serviceTime);

router.get("/streaks", authMiddleware, streaks);

module.exports = router;