# How to setup

If we type the command 
npm run start:all

1. it will only run the frontend and the {backend-sheetDataBase.js}
2. Also create a uploads/resumes and uploads/documents directory in the public folder in the root directory of the project. As specified in the multer to send the additional documents in uploads/documents and resume in uploads/resumes
3. Although the code for database has been written, tried and tested (only unique values for email will be accepted, otherwise it will show an error; might need to handle the error), you will need to enable monogoDB atlas from your own server and hence change the database string url in the source code in sheetDataBase.js
