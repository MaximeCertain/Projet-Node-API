import Cote from "../models/Cote";
import MatchController from "./matchs.controller";
import Match from "../models/Match";
import CoteType from "../models/CoteType";
import User from "../models/User";

class CoteController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let cote = await Cote.find();
            body = {'cote': cote, 'message': 'List cote'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Crée une cote pour un match. UN match ne peut avoir qu'une seule fois chacun des types de cote
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async create(request, response) {
        let status = 200;
        let body = {};
        try {
            let id = request.params.id;
            let match = await Match.findById(id).populate({
                path: 'cotes',
                model: 'Cote',
                populate: {
                    path: 'type',
                    model: 'CoteType'
                }
            });

            let alreadyExistCoteTypeFilter = match.cotes.filter(function (item) {
                return request.body.type == item.type._id;
            });
            if (alreadyExistCoteTypeFilter.length === 0) {
                let cotes = match.cotes;
                let cote = await Cote.create(
                    request.body
                );
                cotes.push(cote);
                match.cotes = cotes;
                match.save();
                body = {'cote': cote, 'message': 'cote created for this match'};
            } else {
                body = {'message': 'cote_type_already_entered_for_match'};
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            console.log("ici");
            let id = request.params.id;
            let cote = await Cote.findById(id).populate('type');
            body = {'cote': cote, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async update(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let cote = await Cote.findByIdAndUpdate(id, request.body);
            body = {'cote': cote, 'message': 'cote updated'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

// /matchs/id/cotes/id
    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let cote = await Cote.findByIdAndDelete(id);
            body = {'message': 'cote deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }


}

export default CoteController;