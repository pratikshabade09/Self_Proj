const express =require('express');
const app = express();
app.use(express.json());    //middleware

app.get('/',(req,res)=>{
    res.send('Server runnig');
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})

app.post('/login',(req,res)=>{
    const {username,password} = req.body;
})