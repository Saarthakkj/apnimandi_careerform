import cors from 'cors';
// import {GoogleAuth} from 'google-auth-library';
// import {google} from 'googleapis';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
var row = 2;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST'], 
    credentials: true,
}))
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// async function batchUpdateValues(spreadsheetId, range, valueInputOption, values) {
//   const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/spreadsheets',
//   });

//   console.log("hello-------------");

//   const service = google.sheets({version: 'v4', auth});
// //   let values = [
// //     [
// //     ],
// //   ];
//   const data = [
//     {
//       range,
//       values,
//     },
//   ];
//   // Additional ranges to update ...
//   const resource = {
//     data,
//     valueInputOption,
//   };

//   try {
//     const result = await service.spreadsheets.values.batchUpdate({
//       spreadsheetId,
//       resource,
//     });
//     console.log('%d cells updated.', result.data.totalUpdatedCells);
//     return result;
//   } catch (err) {
//     // TODO (developer) - Handle exception
//     throw err;
//   }
// }


app.post("/addToSpreadsheet", (req, res)=>{
    // values = [req.];
    // console.log("this is the console output: ", req.body);
    const json = req.body;
    // const values = [json.position_title, json.firstName, json.lastName, json.phoneNumber, json.email, json.url, json.resume, json.additional_documents]
    // batchUpdateValues('1R69SkrNUGmTZCO6Oq6GtoPrdyP8t9bRRdPrO8M_sX2s', `Sheet1!A${row}:H${row}`, 'USER_ENTERED', values);
    row=row+1;
});

app.listen(3001, ()=>{
    console.log(`Server is running on http://localhost:${3001}`);
});

