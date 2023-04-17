import Express from "express";

const app = Express();

app.set("view engine","ejs");

app.get("/:nome/:lang",(req,res)=>{
    var nome = req.params.nome;
    var lang = req.params.lang;

    var exibirMsg = true;

    res.render("index",{
        nome:nome,
        lang:lang,
        msg: exibirMsg
    });
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
});