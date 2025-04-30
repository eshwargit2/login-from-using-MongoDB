const express = require('express');
const User = require('./User');
const path = require('path');
const mongoose = require('mongoose');


const app= express();
const port = 3000;


try{
app.use(express.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/userDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('mongoDB Connected'))
.catch(err=>console.log(err))

app.use(express.static(__dirname));

app.post('/submit',async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    console.log(username+"\n"+password );
    

    const newuser =await User({username, password});
    await newuser.save();

    res.redirect('/login.html')
});

app.post('/login', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username,password});

    if(user){
        res.redirect('/success');
    }else{
        res.send('invalid username. plaease try again.<a href="/login.html"?Back to login</a>');
    }

});

app.get('/success',(req, res)=>{
    res.redirect('/dashboard.html')
  })
  


app.listen(port,()=>{
    console.log(`Server Running http://localhost:${port}`);
    
});


}catch(err){
    console.log(err);
    
}



