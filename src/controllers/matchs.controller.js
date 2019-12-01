import Match from "../models/Match";
import Cote from "../models/Cote";
import Bet from "../models/Bet";
import User from "../models/User";

class MatchController {

    static async list(request, response) {
        let status = 200;
        let body = {};
        try {
            let matchs = await Match.find().populate('sport').populate('cotes');
            body = {'matchs': matchs, 'message': 'List matchs'};
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
            let matchs = await Match.create(
                request.body
            );
            body = {'matchs': matchs, 'message': 'match created'};
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
            let matchs = await Match.findById(id).populate('sport').populate('cotes');
            body = {'matchs': matchs, 'message': 'Details'};
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
            await Match.findByIdAndUpdate(id, request.body);
            body = {'message': 'match updated'};
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
            let match = await Match.findByIdAndDelete(id);
            body = {'message': 'match deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    static async giveResult(request, response) {
        let status = 200;
        let body = [];
        try {
            let id = request.params.id;
            let match = await Match.findById(id);
            //updater le match avec champs resultat
            match.result = request.body.result;
            await match.save();
            //parcours cotes du match
            match.cotes.map(async cote => {
                try {
                    let coteMatch = await Cote.findById(cote).populate('type');
                    let validation = false;
                    //updater le champs boolean validation de la cote selon le résultat du match
                    switch (coteMatch.type.code) {
                        case "1":
                            match.result === "1" && (validation = true);
                            break;
                        case "2":
                            match.result === "2" && (validation = true);
                            break;
                        case "X":
                            match.result === "X" && (validation = true);
                            break;
                        case "1X":
                            if (match.result === "X" || match.result === "1") {
                                validation = true;
                            }
                            break;
                        case "2X":
                            if (match.result === "X" || match.result === "2") {
                                validation = true;
                            }
                            break;
                        case "12":
                            if (match.result === "2" || match.result === "1") {
                                validation = true;
                            }
                            break;
                        default:
                            validation = false;
                    }
                    coteMatch.validation = validation;
                    //sauvegarder le resultat de la cote
                    await coteMatch.save();
                    //si cote validée, on retrouve les paris des users ayant parié dessus et on augmente leur capital selon leur mise
                    if (coteMatch.validation === true) {
                        let bets = await Bet.find({cote: cote});
                        //pour chaque cote faire le tour des parieurs et leur attribuer les gains
                        bets.map(async bet => {
                            try {
                                let user = await User.findById(bet.user);
                                let gain = (bet.amount * coteMatch.cote);
                                user.capital = user.capital + gain;
                                await user.save();
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
            body = {'message': 'match, cotes and user deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}


export default MatchController;