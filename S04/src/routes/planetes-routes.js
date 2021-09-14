import express from 'express';
import HttpErrors from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor() {
        // Définition des routes pour la ressource planet
        router.get('/', this.getAll); // Retrieve (GET) toutes les planètes
        router.get('/:idPlanet', this.getOne)
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    getAll(req, res, next) {
        // res.status(200);
        // res.set('Content-Type', 'application/json');
        // res.send(PLANETS);

        res.status(200).json(PLANETS);
    }
    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet

        //1. La planèete existe = 200 - ok

        const planet = PLANETS.find(p => p.id == idPlanet);
        console.log(planet);

        if (!planet) {
            //2. La planèete existe pas = 404 not found
            return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
        } else {
            res.status(200).json(planet); // Content-Type & send la response
        }
    }

    post(req, res, next) {
        const newPlanet = req.body;


        const planet = PLANETS.find(p => p.id == newPlanet.id);

        if (planet) {
            // J'ai un doublon === ERREUR
            return next(HttpErrors.Conflict(`Une planète avec l'identifiant ${newPlanet.id} existe déjà`))
        } else {
            PLANETS.push(newPlanet);
            res.status(201);
            res.json(newPlanet);
        }
    }

    deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        const index = PLANETS.findIndex(p => p.id == idPlanet);

        if (index === -1) {
            return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
        } else {
            PLANETS.splice(index, 1);
            res.status(204).end();
        }
    }

    patch(req, res, next) {
        return next(HttpErrors.NotImplemented());
    }

    put(req, res, next) {
        return next(HttpErrors.NotImplemented());
    }
}

// Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;