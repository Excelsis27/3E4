import express from 'express';
import HttpErrors from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';
import planetsRepository from '../repositories/planets-repository.js';


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

    async getAll(req, res, next) {
        const filter = {};
        
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        try {
            const planets = await planetsRepository.retrieveAll(filter);
            res.status(200).json(planets);
        } catch(err){
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet

        try {
            const planet = await planetsRepository.retrieveById(idPlanet);
    
            if (!planet) {    
                return next(HttpErrors.NotFound(`La planète avec l'id ${idPlanet} n'existe pas`));
            } else {
                res.status(200).json(planet); // Content-Type & send la response
            }
        } catch(err) {
            return next(err);
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