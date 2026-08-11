import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = 3000;

const etudiants =[ 
  {id: 1, nom: "jerry" },
  {id: 2, nom: "Ali" },
  {id: 3, nom: "Letichia" }

]

app.use(express.json());

app.get('/etudiants', (req: Request, res: Response) => {
  res.json(etudiants);
});
app.get('/etudiants/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `L'étudiant avec l'ID ${id} a été trouvé.` , data: etudiants.find(etudiant => etudiant.id === parseInt(id))});
});
app.delete('/etudiants/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `L'étudiant avec l'ID ${id} a été supprimé.` });
});
app.post('/etudiants', (req: Request, res: Response) => {
  console.log(req.body);
  res.send("L'étudiant a été ajouté.");
});
app.put('/etudiants/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);
  res.json({ 
    message: `L'étudiant avec l'ID ${id} a été mis à jour.`,
    data: req.body 
  });
});
app.patch('/etudiants/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `L'étudiant avec l'ID ${id} a été mis à jour partiellement.` ,
    data: req.body}
  );
});

app.listen(port, () => {
  console.log(`voici mon port: ${port}`);
});

(un model student ) vas dans repository 
(repository) est appeler par service ; 
(service) est appeler par controller ; 
