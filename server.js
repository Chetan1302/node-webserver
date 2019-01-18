const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//Assigning Expresss object to app  which will be used throughout
var app = express();

// Register partial directory location
hbs.registerPartials(__dirname+"/views/partials");

//Middleware to inform which is template engine used here
app.set('view engine','hbs');


//Helpers using handlebars
hbs.registerHelper('getCurrentYear',()=>{
   return  new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return  text.toUpperCase();
 });




 //Middleware
 app.use((req,res,next) => {
     var now = new Date().toString();
     var log = `${now} : ${req.method}  ${req.url}`;

     console.log(log);

     fs.appendFile('server.log',log + '\n',(err)=>{
         if(err){
             console.log('Unable to log to file'+ err);
         }
     });

     next();
 });


 app.use((req,res,next)=>{
     next();
 });


//Middleware to inform express static library
app.use(express.static(__dirname + "/public"));




//Handler to process index get  request
app.get('/',(req,res)=>{
  //  res.send("<h1>Hello Express</h1>");
//   res.send({
//       name: "Chetan",
//       likes:[
//           "Reading",
//           "Sleeping"
//       ]
//   })
res.render("home.hbs",{
    pageTitle: 'Home Page',
    welcomeMessage:"Welcome to my Website"
});
})


//Handler to process about Get request
app.get('/about',(req,res)=>{
   // res.send("About Page");
   res.render("about.hbs",{
       pageTitle: 'About Page',
   });
})


//Handler to process bad request
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"BAD Request"
    })
})



//Handler to process maintainence Get request
app.get('/maintain',(req,res)=>{
    // res.send("About Page");
    res.render("maintenance.hbs",{
        pageTitle: 'Maintainnance Page',
        welcomeMessage:"Soon this page will be available"
    });
 })

//Starting up Server
//IN normal case
/*app.listen(3000,()=>{
    console.log("Server is up and running on port 3000");
});*/

//IN case of Heroku

app.listen(port,()=>{
    console.log("Server is up and running on port 3000");
});