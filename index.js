import Express from "express";

const app = Express();

app.set("view engine","ejs");
app.use(Express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
});