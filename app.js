// Task1: initiate app and run server at 3000
const express = require('express')
const app = express()
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

const{MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017';
const databaseName = 'Assigmnement'
const client = new MongoClient(url);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req, res) => {
    /*const users = getUserData()
    res.send(users)*/
    async function getData()
    {
        let result = await client.connect();
        db = result.db(databaseName);
        collection = db.collection('employee');
        let data = await collection.find({}).toArray();
        console.log(data)
        res.send(data)

        /*data.then(function(result) {
            console.log(result) 
            // "Some User token"
        })*/

    }

getData();

})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId
    

   async function getSingleData()
    {
        let result = await client.connect();
        db = result.db(databaseName);
        collection = db.collection('employee');
        let data = await collection.find({id:employeeId});
        console.log(data)
    } 
    getSingleData();

    res.send({success: true, msg: 'Employee Fetched successfully'})
    
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/add/api/employeelist', (req, res) => {
    //const existUsers = getUserData()
    const userData = req.body
    if (userData.id == null || userData.name == null || userData.lastname == null || userData.email == null || userData.mobile == null || userData.gender == null
        || userData.age == null){
        return res.status(401).send({error: true, msg: 'Employee data missing'})
    }
    /*const findExist = existUsers.find( user => user.name === userData.name )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'Employee Name already exist'})
    }*/

    async function insertData()
    {
        let result = await client.connect();
        db = result.db(databaseName);
        collection = db.collection('employee');
        let data = await collection.insert(userData);
        console.log(data)

    } 
    insertData();
    
    //existUsers.push(userData)

    //saveUserData(existUsers);
    res.send({success: true, msg: 'Employee data added successfully'})

})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('delete/api/employeelist/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId
    

   async function deleteData()
    {
        let result = await client.connect();
        db = result.db(databaseName);
        collection = db.collection('employee');
        let data = await collection.deleteOne({name:employeeId});
        console.log(data)
    } 
    deleteData();

    res.send({success: true, msg: 'Employee removed successfully'})
    
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000, () => {
    console.log('Server runs on port 3000')
})


