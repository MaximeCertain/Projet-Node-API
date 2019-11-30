import CoteType from "../models/CoteType";

class CoteTypeController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let cotes_types = await CoteType.find();
            body = {'cotes_types': cotes_types, 'message': 'List cotes_types'};
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
            let cote_type = await CoteType.create(
                request.body
            );
            body = {'cote_type': cote_type, 'message': 'cote_type created'};
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
            let cote_type = await CoteType.findById(id);
            body = {'cote_type': cote_type, 'message': 'Details'};
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
            let cote_type = await CoteType.findByIdAndUpdate(id, request.body);
            body = {'cote_type': cote_type, 'message': 'cote_type updated'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let cote_type = await CoteType.findByIdAndDelete(id);
            body = {'message': 'cote_type deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default CoteTypeController;