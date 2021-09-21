// CRUD
import Planet from '../models/planet-model.js';

    const ZERO_KELVIN = -273.15;

class PlanetsRepository {

    retrieveAll(filter) {

        // Équivalent des WHERE en SQL
        const testFilter = {
            discoveredBy: 'Skadex',
            temperature: { $gt: 241 },
            'position.y': { $lt: 500 }
        }
        //WHERE discoveredBy = 'Skadex' AND temperature = 240

        const testFilterOr = {
            $or:[ {discoveredBy: 'Skadex'},
            { temperature: { $gt: 241 }}]
        }

        return Planet.find(filter);
    }

    retrieveById(id) {
        return Planet.findById(id);
    }

    create(planet) {
        return Planet.create(planet);
    }

    delete(id) {
        return Planet.findByIdAndDelete(id);
    }

    transform(planet, transformOptions = {}) {

        if(transformOptions.unit) {
            switch(transformOptions.unit) {
                case 'c':
                    planet.temperature += ZERO_KELVIN;
                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;
            }
        }

        delete planet.__v;

        return planet;
    }
}

export default new PlanetsRepository();