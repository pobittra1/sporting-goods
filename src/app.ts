import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
