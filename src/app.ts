import express from 'express'
import cors from 'cors'
import { authRouter } from './modules/auth/auth.route';
import { userRoute } from './modules/users/users.route';
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded())

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;