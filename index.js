const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const interventionRoutes = require("./src/routes/interventionRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(
    path.join(__dirname, "src", "docs", "openapi.yaml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
    res.send("API Oficina a funcionar");
});

app.use((req, res) => {
    res.status(404).json({
        message: "Rota não encontrada"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});