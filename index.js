import Express from "express";
import  BodyParser  from "body-parser";
import connection from "./database/database.js";
import pergunta from "./database/Pergunta.js";

const app = Express();
const bodyParser = BodyParser;


//database
connection.authenticate()
  .then(() => {
    console.log('Conectado ao MySQL!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao MySQL:', err);
  });




app.set("view engine","ejs");
app.use(Express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS

app.get("/",(req,res)=>{
    pergunta.findAll().then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    
    });
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

//rota para salvar pergunta
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta.create({
      titulo: titulo,
      descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});



app.listen(8080,()=>{
    console.log("Server is running on port 8080")
});