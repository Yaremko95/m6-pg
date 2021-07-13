import express from "express";

import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.listen(port, () => console.log("🚀 Server is running on port ", port));

app.on("error", (error) => console.log("🚀 Server is crashed due to ", error));
