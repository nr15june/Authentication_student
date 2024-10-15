const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');

const app = express();
dotenv.config();//ต้องเรียกใช้.env
app.use(express.json())

// ConnectDB
mongoose.connect(process.env.MONGO_DB_URI, {
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// เรียกไฟล์ต่างๆ 
const poststudentRouter = require("./routes/poststudent")
app.use("/api/poststudent" , poststudentRouter)

const studentRouter = require("./routes/student");
app.use("/api/student", studentRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));