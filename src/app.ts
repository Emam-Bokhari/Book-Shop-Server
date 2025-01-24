import express from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router)

// check server health
app.get("/", (req, res) => {
    res.send("Server is running...");
})

export default app;