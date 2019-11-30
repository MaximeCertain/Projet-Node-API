import Cote from "../models/Cote";
import MatchController from "./matchs.controller";
import Match from "../models/Match";
import CoteType from "../models/CoteType";

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
    static async create(request, response) {
        let status = 200;
        let body = {};
        try {
            let id = request.params.id;
            console.log(id);
            let match = await Match.findById(id);
            let cotes = match.cotes;
            let cote = await Cote.create(
                request.body
            );
            console.log(cote);
            cotes.push(cote);
            match.cotes = cotes;
            match.save();
            body = {'message': 'cote created for this match'};
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
            let id = request.params.id;
            let cote = await Cote.findById(id);
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