
import Planet from '../models/planet-model.js';

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
}

export default new PlanetsRepository();