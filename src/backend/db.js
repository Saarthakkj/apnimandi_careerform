const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/apnimandi' ).then( ()=>{
    console.log('Connected to MongoDB');
});
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname : String,
    email: String,
    phonenumber: String,
    url: String,
  }, {timestamps: true});
  
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');