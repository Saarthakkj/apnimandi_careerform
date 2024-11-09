import express from 'express'; // Import express
import cors from 'cors'; // Import cors
import  {userRouter}  from './user.js';

const app = express();
const port = 3000;
const router = express.Router();
router.get('/user' , userRouter);
module.exports = router;