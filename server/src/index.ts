import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";
import tenantRoutes from "./routes/tenantsRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leasesRoutes from "./routes/leasesRoutes";
import applicationRoutes from "./routes/applicationRoutes";
// route Import 

// configuation
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes

app.get("/", (req, res) => {
    res.send("This is home route")
});

app.use("/properties", propertyRoutes)
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes)
app.use("/managers", authMiddleware(["manager"]), managerRoutes)
app.use("/leases", leasesRoutes)
app.use("/applications", applicationRoutes)

// server
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running  on port ${port}`);
});