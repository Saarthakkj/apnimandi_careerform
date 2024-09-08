const express= require('express');
const app = express();
const cors = require('cors');
const port = 3000;
import  {userRouter}   from './user.js';

const router = express.Router();

router.get('/user' , userRouter);

module.exports = router;