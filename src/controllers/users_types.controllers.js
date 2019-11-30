import UserType from "../models/UserType";
import User from "../models/User";

class UserTypeController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let users_types = await UserType.find();
            body = {'users_types': users_types, 'message': 'List users_types'};
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
            let user_type = await UserType.create({
                label: request.body.label
            });
            body = {'user_type': user_type, 'message': 'user_type created'};
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
            let user_type = await UserType.findById(id);
            body = {'user_type': user_type, 'message': 'Details'};
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
            let user_type = await UserType.findByIdAndUpdate(id, request.body);
            body = {'user_type': user_type, 'message': 'user_type updated'};
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
            let user_type = await UserType.findByIdAndDelete(id);
            body = {'message': 'user_type deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default UserTypeController;