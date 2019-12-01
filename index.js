import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import router from './src/routes/route'
import database from './src/models/database';
//création de l'app
const app = express();

//configuration du serveur avec cors et BodyParser
//bodyparser : parser les requêtes POST quand il y a des variables dedans
//cors : module permettant de faire du multirequetage sur différentes applications
//pour qu'un front puisse faire du requetage sur l'appli il faut que cors soit activé
// on parse en json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//tu peux aller dans mon api
app.use(cors({origin: true}));

//utilisation des routes
app.use("/", router);
const port = 3001;

database()
    .then(async () => {
        console.log("database server is connected");
        app.listen(port, () => {
            console.log(`Serveur lancé sur le port ${port} ...`);
        });
    });

//on va utiliser l'objet app partout. Dans les autres controlleurs.
export default app;