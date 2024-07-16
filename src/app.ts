import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//aplication routers
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
export default app;
