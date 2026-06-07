const express = require("express");

const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getServices);
router.post("/", authMiddleware, createService);
router.get("/:id", authMiddleware, getServiceById);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;