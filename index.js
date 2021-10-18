const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const data = {
    users:[
        {
            id:1,
            name:'Taras',
            age:'20'
        },
        {
            id:2,
            name:'Dmytro',
            age:'16'
        },
        {
            id:3,
            name:'Markijan',
            age:'26'
        },
        {
            id:4,
            name:'Darii',
            age:'24'
        },
    ]
}

app.get('/', (req, res)=>{
    res.send('<p>You are on my home page</p><p>Type /users in the search string</p>')
})

app.get('/users', (req, res)=>{
    res.send(data.users);
})

app.get('/users/:id', (req, res)=>{
    const foundUser = data.users.find(user => user.id == req.params.id);

    if(foundUser)
        res.send(foundUser);
    else
        res.send('<p>User not found</p>');
})

app.post('/users_post', urlencodedParser, function (req, res) {
    const response = {
       name:req.body.name,
       age:req.body.age
    };
    data.users.push({id:data.users.length+1, name:response.name, age:response.age})
    res.end(JSON.stringify(data.users));
 })

let server = app.listen(5000, ()=>{
    console.log(`App is running on port ${server.address().port}`);
});