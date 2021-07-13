import express from "express";

import cors from "cors";
import tutorsRoutes from "./services/tutors/index.js";
import modulesRoutes from "./services/modules/index.js";
import examsRoutes from "./services/exams/index.js";
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use("/tutors", tutorsRoutes);
app.use("/modules", modulesRoutes);
app.use("/exams", examsRoutes);

app.listen(port, () => console.log("🚀 Server is running on port ", port));

app.on("error", (error) => console.log("🚀 Server is crashed due to ", error));
