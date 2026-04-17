const express =require('express');
const app = express();  //this creates actual server(instance)
app.use(express.json());    //middleware (json to JS obj) eg, when we want data by 'req.body'

app.get('/',(req,res)=>{    //wht to send to user when it reached for certain route
    res.send('Server runnig');
});

const port = 3000;
app.listen(port,()=>{       //listens requests continuously
    console.log(`Server started at port ${port}`)
})

app.post('/login',(req,res)=>{          //used post here bcz, login ===security
    const {username,password} = req.body;   //extract data from client
    console.log(username,password);
    res.send("--------------------Secure login------------------")
})

//get -> visible in url 
//post -> not visible in url (secure)


const mysql = require('mysql2');

