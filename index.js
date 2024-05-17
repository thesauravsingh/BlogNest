import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var title =[];
var content =[];

app.get("/", (req,res) => {
    // console.log("Titles array:", title);
    // console.log("Content array:", content);
    if(title.length!=0){
        res.render("index.ejs", {title: title, content: content});
    }
    else{
        res.render("index.ejs");
    }
    
});

app.get("/create", (req,res) => {
    const ttle = '';
    const cntent = '';
    console.log("create");
    res.render("create.ejs", { title: ttle, content: cntent, edit: false});
});

app.get("/detail", (req,res) => {
    // console.log("Titles array:", title);
    // console.log("Content array:", content);
    const ind = req.query.ind;
    // console.log(ind);
    const ttle = title[ind];
    // console.log(ttle);
    const cntent = content[ind];
    // console.log(cntent);
    
    res.render("detail.ejs", {title: ttle, content: cntent, ind: ind, edit: true});
});

app.get("/edit", (req,res) => {
  const ind = req.query.ind;
  const ttle = title[ind];
  const cntent = content[ind];
  console.log(cntent);
  console.log("edit was clicked");
  res.render("create.ejs", { title: ttle, content: cntent, ind: ind, edit: true});
});

app.get("/delete", (req, res) => {
    const ind = req.query.ind;
    // Delete the post based on index 'ind'
    title.splice(ind, 1);
    content.splice(ind, 1);
    // Redirect to home page or any other appropriate page
    res.redirect("/");
});

app.post("/update", (req, res) => {
    const ind = req.body.ind;
    title[ind] = req.body.title;
    content[ind] = req.body.content;
    res.redirect("/");
});

app.post("/submit", (req, res)=>{
    title.push(req.body['title']);
    content.push(req.body['content'])
    // console.log("Titles array:", title);
    // console.log("Content array:", content);
    res.redirect("/");
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });