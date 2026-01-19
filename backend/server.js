import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import postsRouter from "./routes/posts.js";
// import commentsRouter from "./routes/comments.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postsRouter);
// app.use("/posts", commentsRouter); // /posts/:id/comments

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
