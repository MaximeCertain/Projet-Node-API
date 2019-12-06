import Match from "../models/Match";
import Cote from "../models/Cote";
import Bet from "../models/Bet";
import User from "../models/User";

class MatchController {
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
            let matchs = await Match.find().populate('sport').populate({
                path: 'cotes',
                model: 'Cote',
                populate: {
                    path: 'type',
                    model: 'CoteType'
                }
            });
            body = {'matchs': matchs, 'message': 'List matchs'};
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
            let matchs = await Match.findById(id).populate('sport').populate({
                path: 'cotes',
                model: 'Cote',
                populate: {
                    path: 'type',
                    model: 'CoteType'
                }
            });
            body = {'matchs': matchs, 'message': 'Details'};
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
            await Match.findByIdAndUpdate(id, request.body);
            body = {'message': 'match updated'};
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
            let match = await Match.findByIdAndDelete(id);
            body = {'message': 'match deleted'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }

    /**
     * Met à jour le champs résultat de la table match, et attribue les gains aux vainqueurs des paris
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    static async giveResult(request, response) {
        let status = 200;
        let body = [];
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
            //updater le match avec champs resultat
            match.result = request.body.result;
            await match.save();
            //parcours cotes du match
            match.cotes.map(async cote => {
                try {
                    let validation = false;
                    //updater le champs boolean validation de la cote selon le résultat du match
                    switch (cote.type.code) {
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
                    cote.validation = validation;
                    //sauvegarder le resultat de la cote
                    await cote.save();
                    //si cote validée, on retrouve les paris des users ayant parié dessus et on augmente leur capital selon leur mise
                    if (cote.validation === true) {
                        let bets = await Bet.find({cote: cote._id});

                        //pour chaque cote faire le tour des parieurs et leur attribuer les gains
                        async function synchroneIterations(bets) {
                            await Promise.all(bets.map(async bet => {
                                let user = await User.findById(bet.user)
                                let gain = (bet.amount * cote.cote);
                                user.capital = user.capital + gain;
                                try {
                                    await user.save();
                                } catch (error) {
                                    console.log(error);
                                }
                            }));
                        }

                        await synchroneIterations(bets);
                    }
                } catch (error) {
                    console.log(error);
                }
            });
            body = {'message': 'match, cotes and user updated'};
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return response.status(status).json(body);
    }
}


export default MatchController;