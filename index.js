import Express from "express";
import  BodyParser  from "body-parser";
import connection from "./database/database.js";
import pergunta from "./database/Pergunta.js";
import resposta from "./database/Resposta.js";

const app = Express();
const bodyParser = BodyParser;
const { raw } = bodyParser;


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

//PAGINA INICIAL
app.get('/', async (req, res) => {
  const perguntas = await pergunta.findAll({ raw: true });
  res.render('index', { perguntas, ordem: 'recentes' })
});



//ROTA PARA ORDERNAR PERGUNTAS
app.post("/ordenarperguntas",(req,res)=>{
  const {ordem} = req.body;
  let queryOptions = {};
  if(ordem === 'recentes'){
    queryOptions.order = [['createdAt','DESC']];
  } else {
    queryOptions.order = [['createdAt','ASC']];
  }
  pergunta.findAll({raw: true,  ...queryOptions}).then((perguntas)=>{
    res.render("index",{
      perguntas: perguntas,
      ordem: ordem
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


app.get("/pergunta/:id",(req,res)=>{
   const {id} = req.params;
  pergunta.findOne({
    where: {id: id}
  }).then((pergunta)=>{
    if(pergunta != undefined){
      res.render("pergunta",{
        pergunta: pergunta
      });
    }else{
      res.redirect("/");
    }
  });
});





app.listen(8080,()=>{
    console.log("Server is running on port 8080")
});