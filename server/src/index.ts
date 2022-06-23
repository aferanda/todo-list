import express from 'express';
import cors from 'cors';

import loginRoute from './user/login.routes';
import taskRoute from './task/task.routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/tasks', taskRoute);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
