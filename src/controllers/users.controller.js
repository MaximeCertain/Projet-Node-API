import User from "../models/User";


class UserController {
    /**
     * Liste des utilisateurs
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async list(request, response) {
        //je veux  tous les blogs
        let status = 200;
        let body = {};
        try {
            let users = await User.find().populate('user_type').populate('account_actions').populate({
                path: 'bets',
                model: 'Bet',
                populate: {
                    path: 'cote',
                    model: 'Cote',
                    populate: {
                        path: 'type',
                        model: 'CoteType'
                    }
                }
            });
            body = {'users': users, 'message': 'List users'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Création d'utilisateur
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
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

    /**
     * Utilisateur avec les tous les détails : Type d'utilisateur, Actions, Paris(Cote(TYpe de cote), Match)
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let user = await User.findById(id).populate('user_type').populate('account_actions').populate({
                path: 'bets',
                model: 'Bet',
                populate: [{
                    path: 'cote',
                    model: 'Cote',
                    populate: {
                        path: 'type',
                        model: 'CoteType',
                    }
                }, {
                    path: 'match',
                    model: 'Match'
                }]
            });
            body = {'user': user, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Mise à jour de l'utilisateur
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
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

    /**
     * SUpression de l'utilisateur
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let user = await User.findByIdAndDelete(id);
            body = {'message': 'user deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * FOnction permettant la connexion d'utilisateur
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async checkLogin(request, response) {
        let status = 200;
        let body = [];
        try {
            let user = await User.findOne({
                email: request.body.email,
                password: request.body.password
            }).populate('user_type');
            body = {'user': user, 'message': 'connection successfull'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default UserController;