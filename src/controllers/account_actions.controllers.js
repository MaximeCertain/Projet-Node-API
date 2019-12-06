import AccountAction from "../models/AccountAction";
import User from "../models/User";
import Match from "../models/Match";
import Cote from "../models/Cote";

class AccountActionController {

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {

            let account_actions = await AccountAction.find();
            body = {'account_actions': account_actions, 'message': 'List account_actions'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async create(request, response) {
        let status = 200;
        let body = {};
        try {
            let id = request.params.id;
            let user = await User.findById(id);
            let account_actions = user.account_actions;
            let capital = user.capital;
            //updater le solde du compte
            if (request.body.type === "DEPOSIT") {
                capital = capital + request.body.amount;
            } else {
                if (capital >= request.body.amount) {
                    capital = capital - request.body.amount;
                } else{
                    body = {'message': "capital_too_low"};
                    return response.status(status).json(body);
                }
            }
            let account_action = await AccountAction.create(
                request.body
            );
            account_actions.push(account_action);
            user.account_actions = account_actions;
            user.capital = capital;
            await user.save();
            body = {'message': 'account_action created for user'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async details(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let account_action = await AccountAction.findById(id);
            body = {'account_action': account_action, 'message': 'Details'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async update(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let account_action = await AccountAction.findByIdAndUpdate(id, request.body);
            body = {'account_action': account_action, 'message': 'account_action updated'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async delete(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let account_action = await AccountAction.findByIdAndDelete(id);
            body = {'message': 'account_action deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default AccountActionController;