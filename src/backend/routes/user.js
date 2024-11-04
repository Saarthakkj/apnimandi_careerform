import express from 'express'; // Import express
import jwtsecret from '../config.js'; // Import jwtsecret
import User from '../db.js'; // Import User model
import checkAuthHeader from './middleware.js'; // Import the middleware

const app = express();
const port = 3000;
const router = express.Router();

function generateaccesstoken (uid){
  return jwt.sign(uid, jwtsecret);
}

router.get('/', (req, res) => {
  res.send('Hello World!');
});

routes.post('/signup', async (req, res) => {
  const body = req.body; 
  const username = body.firstname + body.lastname;
  const token = generateaccesstoken(username);
  const existingUser = await User.findOne({
    username: req.body.firstname + req.body.lastname
  });
  if(existinguUser){
    return res.status(411).json({
      message : "User already exists" 
    });
  };

  const newUser = new User({
    username: req.body.firstname + req.body.lastname,
    password: req.body.password,
    phoneno : req.body.phoneno,
    email: req.body.email,
    url: req.body.url
  });
  res.send({
    "message" : " User signed up successfully",
    "token" : token
  });
});

routes.post('/signin', checkauthHeader , async (req, res) => {
  const body = req.body;
  const username = body.firstname + body.lastname;
  const token = generateaccesstoken(username);
  const existingUsr = await User.findOne({
    username: req.body.firstname + req.body.lastname
  });
  if(!existingUser){
    return res.status(404).json({
      message : "User not found"
    });
  }
  if(existingUser.password !== req.body.password){
    return res.status(401).json({
      message : "Password is incorrect"
    });
  }
  res.send({
    "message" : "User signed in successfuly" ,
    "token" : token
  });
});

app.use(router);

app.listen(port , () =>{
  console.log(`Server is running on port ${port}`);
}) ;

module.exports = router;