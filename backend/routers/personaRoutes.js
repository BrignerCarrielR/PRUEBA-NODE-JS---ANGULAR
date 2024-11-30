import express from 'express';
import {PersonaController} from "../controllers/personaControllers.js";

const routerPersona = express.Router();

routerPersona.get('/', PersonaController.getPersonas);
routerPersona.get('/:id', PersonaController.getPersona);
routerPersona.post('/',  PersonaController.insertPersona);
routerPersona.put('/:id',  PersonaController.updatePersona);
routerPersona.get('/estado/:id',  PersonaController.deactivatePersona);

export default routerPersona;