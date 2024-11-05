import cors from 'cors';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

const url = 'mongodb+srv://prakhar22361:jLM42gDicITQ4VYj@cluster0.knqly.mongodb.net/';
const dbName = 'apniMandi';
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define different destinations based on the file field name
        if (file.fieldname === 'resume') {
            cb(null, 'public/uploads/resumes/'); // Destination for resumes
        } else {
            cb(null, 'public/uploads/documents/'); // Destination for additional documents
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
})
const upload = multer({ storage: storage });
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST'], 
    credentials: true,
}))

mongoose.connect(url + dbName).then(()=>console.log("mongoDB Connected")).catch(err=>console.log("MONGOOSE ERROR: ", err));
const userSchema = new mongoose.Schema({
    position_title: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    url: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: false
    },
    additional_documents: {
        type: String,
        required: false
    }
}, {timestamps: true});
const user = mongoose.model('apnimandis', userSchema);
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(upload.fields([{ name: 'resume' }, { name: 'additional_documents' }]));


app.post("/addToSpreadsheet" ,async (req, res)=>{
    console.log("this is the console output for body: ", req.body);
    console.log("this is the console output for files: ", req.files);
    const document = {
        position_title: req.body.position_title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        url: req.body.url,
        resume: req.files['resume'] ? req.files['resume'][0].path : null,
        additional_documents: req.files['additional_documents'] ? req.files['additional_documents'][0].path : null,
    };

    const result = await user.create(document);
    console.log(`Inserted document with id: ${result.insertedId}`);
    res.send(`Document inserted with id: ${result.insertedId}`);

});

app.listen(3001, ()=>{
    console.log(`Server is running on http://localhost:${3001}`);
});

