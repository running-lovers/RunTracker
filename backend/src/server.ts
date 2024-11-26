import express from 'express';
import cors from 'cors';
import { router as indexRouter } from './routes/indexRouter';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
})

