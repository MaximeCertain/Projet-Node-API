import Bet from "../models/Bet";
import User from "../models/User";

class BetController {
    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let bets = await Bet.find();
            body = {'bets': bets, 'message': 'List bets'};
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
            let idCote = request.params.idcote;
            let idUser = request.params.iduser;
            let idMatch = request.params.idmatch;
            let user = await User.findById(idUser);
            let bets = user.bets;
            let capital = user.capital;
            if (capital >= request.body.amount && request.body.amount > 0) {
                let bet = await Bet.create({
                    amount: request.body.amount,
                    match: idMatch,
                    user: idUser,
                    cote: idCote
                });
                bets.push(bet);
                user.bets = bets;
                user.capital = capital - request.body.amount;
                await user.save();
                body = {'bet': bet, 'message': 'bet created for user'};
            } else {
                body = {'message': 'capital_too_low'};
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
            let id = request.params.id;
            let bet = await Bet.findById(id);
            body = {'bet': bet, 'message': 'Details'};
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
            let bet = await Bet.findByIdAndUpdate(id, request.body);
            body = {'bet': bet, 'message': 'bet updated'};
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
            let bet = await Bet.findByIdAndDelete(id);
            body = {'message': 'bet deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}

export default BetController;