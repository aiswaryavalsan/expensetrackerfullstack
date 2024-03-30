const bodyParser = require('body-parser');
const path=require('path');
const express=require('express');
const cors=require('cors');
const sequelize=require('./util/database')
const app=express();
const expenseRouter=require('./routes/expense')
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/expens',expenseRouter);
sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch((err)=>{console.log(err)})