import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";
const app = express();
const PORT = 5000;

sequelize.sync();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/user", routes.user);
app.use("/api/v1/product", routes.product);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
