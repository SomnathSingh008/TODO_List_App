const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static("assets"));
app.use(express.urlencoded());

const db = require("./config/mongoose");
const model = require("./models/tasks");

// dummy data to display
var todo_list = [
    {
        description:"Express app",
        category:"work",
        due_date:"14/4/2023"
    }
];


app.get('/', function(req, res)
{
    model.find({}, function(err, task){
        if(err)
        {
            console.log(err);
            return;
        }

        return res.render('home',{
            todo_list: task
        });
    });
});

app.post("/form_input", function(req, res){
    // todo_list.push(req.body);
    // console.log(req.body);
    model.create({
        description: req.body.description,
        type: req.body.Category,
        due_date: req.body.due_date
    },function(err){
        if(err)
        {
            console.log(err);
            return;
        }

        model.find({}, function(err, task){
            if(err)
            {
                console.log(err);
                return;
            }
    
            return res.render('home',{
                todo_list: task
            });
        });
    });
    // console.log(req.body);
});

app.get('/deleteTask', function(req, res){
    // for (var i=0; i<todo_list.length; i++)
    // {
    //     if(i == req.query.task)
    //     {
    //         todo_list.splice(i, 1);
    //     }
    // }
    // console.log(req.query.task);
    model.findByIdAndDelete(req.query.task, function(err){
        if(err)
        {
            console.log(err);
            return;
        }

        model.find({}, function(err, task){
            if(err)
            {
                console.log(err);
                return;
            }
    
            return res.render('home',{
                todo_list: task
            });
        });
    });
});

app.listen(port, function(err)
{
    if(err)
    {
        console.log("Error Occured While Lstening to the port", port);
        return;
    }

    console.log(`Server is up and running on port ${port}`);
});