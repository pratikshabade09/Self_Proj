const express =require('express');
const app = express();  //this creates actual server(instance)
app.use(express.json());    //middleware (json to JS obj) eg, when we want data by 'req.body'

app.get('/',(req,res)=>{    //wht to send to user when it reached for certain route
    res.send('Server runnig');
});


app.post('/login',(req,res)=>{          //used post here bcz, login ===security
    const {username,password} = req.body;   //extract data from client
    console.log(username,password);
    res.send("--------------------Secure login------------------")
})

//get -> visible in url 
//post -> not visible in url (secure)


const mysql = require('mysql2');
const db = mysql.createConnection({     //connected node-->sql
    host:'localhost',
    user:'root',
    password:'mysql2',
    database:'loginDB'
})

db.connect((err) => {
    if (err) {
        console.log('DB error');
    } else {
        console.log('DB connected');
    }
});

db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {

            if (err) {
                console.log(err);
                return res.send("Database error");
            }

            if (results.length === 0) {
                return res.send("User not found");
            }

            const user = results[0];

            console.log("User from DB:", user);

            if (password !== user.passwordHash) {
                return res.send("Incorrect password");
            }

            res.send("Login successful (next: session)");
        }
    );













    

const port = 3000;
app.listen(port,()=>{       //listens requests continuously
    console.log(`Server started at port ${port}`)
})