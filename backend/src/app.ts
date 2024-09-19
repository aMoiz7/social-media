import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";


dotenv.config();



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin:"*",
  credentials:true
}))
const PORT = process.env.PORT ;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

export default app;
