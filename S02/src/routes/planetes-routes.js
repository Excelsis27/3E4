import express from 'express';
import HttpErrors from 'http-errors';
import Http from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor(){
        // Définition des routes pour la ressource planet
        router.get('/planets', this.getAll); // Retrieve (GET) toutes les planètes
        router.get('/planets/:idPlanet', this.getOne)
        router.post('/planets', this.post);
    }



    getAll(req, res, next) {
        res.status(200);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }
    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet

        //1. La planèete existe = 200 - ok

        const planet = PLANETS.find(p => p.id == idPlanet);
        console.log(planet);

        if(!planet) {
            //2. La planèete existe pas = 404 not found
            return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
        } else {
            res.status(200).json(planet); // Content-Type & send la response
        }
    }

    post(req, res, next) {

    }
}

// Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;