const express = require("express");
const bodyParser = require("body-parser");
const date  = require(__dirname + "/date.js")

let List = ["Buy food","Eat food","Cook food"];
let workList = []
const app = express();
  
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", function(req,res){
  
  let day = date.getDate()
  res.render("list", {pageTitle:day, arrayItems:List})  
});

app.post("/", function(req,res){
  let newList = req.body.nextList;
  if(req.body.list === "Work Items"){
    workList.push(newList)
    res.redirect("/work")
  }else{
    List.push(newList);
    res.redirect("/");
  }
}); 

app.get("/work", function(req,res){
  res.render("list", {pageTitle:"Work Items", arrayItems:workList})
})


// app.post("/work", function(req,res){
//   let newList = req.body.nextList
//   console.log(req.body);
//   workList.push(newList)
//   res.redirect("/work")
// })



app.listen(process.env.PORT||4000,function(){
  console.log("server is started at port 4000")
}) 