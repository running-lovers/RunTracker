import express from 'express';
import { router as indexRouter } from './routes/indexRouter';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
})


