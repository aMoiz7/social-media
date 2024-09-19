import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import interactionRoutes from "./routes/interaction"


dotenv.config();



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT ;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/interaction", interactionRoutes);

export default app;
