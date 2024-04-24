import express, { Request, Response } from 'express';

const port = Number(process.env.PORT) || 8080;

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send('Testing 123, did it deploy ?');

  console.log('Serviced a request')
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send({ success: true });
});


app.get("/toyin", (req: Request, res: Response) => {
    res.status(200).send({ firstname : "Toyin", surname: "Ajewole" });
  });

  
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
