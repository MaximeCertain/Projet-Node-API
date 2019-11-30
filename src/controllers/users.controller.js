import User from "../models/User";


class UserController {
    static async list(request, response) {
        //je veux  tous les blogs
        let status = 200;
        let body = {};
        try {
            let users = await User.find().populate('user_type').populate('account_actions').populate('bets');
            body = {'users': users, 'message': 'List users'};
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
            let user = await User.create({
                email: request.body.email,
                lastName: request.body.lastName,
                firstName: request.body.firstName,
                password: request.body.password,
                user_type: request.body.user_type
            });
            body = {'user': user, 'message': 'user created'};
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
            let user = await User.findById(id).populate('user_type').populate('account_actions');
            body = {'user': user, 'message': 'Details'};
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
            let user = await User.findByIdAndUpdate(id, request.body);
            body = {'user': user, 'message': 'User updated'};
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
            let user = await User.findByIdAndDelete(id);
            //    await Post.deleteOne(id);
            body = {'message': 'user deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async checkLogin(request, response){
        let status = 200;
        let body = [];
        try {
            let user = await User.findOne({email: request.body.email, password: request.body.password});
            body = {'user': user, 'message': 'connection successfull'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default UserController;