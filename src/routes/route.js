import {Router} from 'express';
import UserController from "../controllers/users.controller";
import UserTypeController from "../controllers/users_types.controllers";
import SportController from "../controllers/sports.controller";
import MatchController from "../controllers/matchs.controller";
import Match from "../models/Match";
import CoteTypeController from "../controllers/codes_types.controllers";
import AccountActionsController from "../controllers/account_actions.controllers";
import CoteController from "../controllers/cotes.controller";
import BetController from "../controllers/bets.controller";

const router = Router();

//users
router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.get('/users/:id', UserController.details);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
router.post('/check_login', UserController.checkLogin);

//users_types
router.get('/users_types', UserTypeController.list);
router.post('/users_types', UserTypeController.create);
router.get('/users_types/:id', UserTypeController.details);
router.put('/users_types/:id', UserTypeController.update);
router.delete('/users_types/:id', UserTypeController.delete);

//sports
router.get('/sports', SportController.list);
router.post('/sports', SportController.create);
router.get('/sports/:id', SportController.details);
router.put('/sports/:id', SportController.update);
router.delete('/sports/:id', SportController.delete);

//matchs
router.get('/matchs', MatchController.list);
router.post('/matchs', MatchController.create);
router.get('/matchs/:id', MatchController.details);
router.put('/matchs/:id', MatchController.update);
router.delete('/matchs/:id', MatchController.delete);
router.put('/result/:id', MatchController.giveResult);

//cotes
router.get('/cotes', CoteController.list);
router.get('/cotes/:id', CoteController.details);

router.post('/matchs/:id/cotes', CoteController.create);
router.put('/cotes/:id', CoteController.update);
router.delete('/cotes/:id', CoteController.delete);

//cotes_types
router.get('/cotes_types', CoteTypeController.list);
router.post('/cotes_types', CoteTypeController.create);
router.get('/cotes_types/:id', CoteTypeController.details);
router.put('/cotes_types/:id', CoteTypeController.update);
router.delete('/cotes_types/:id', CoteTypeController.delete);

//account_actions
router.get('/account_actions', AccountActionsController.list);
router.post('/users/:id/account_actions', AccountActionsController.create);
router.get('/account_actions/:id', AccountActionsController.details);
router.put('/account_actions/:id', AccountActionsController.update);
router.delete('/account_actions/:id', AccountActionsController.delete);

//bets
router.get('/bets', BetController.list);
router.post('/users/:iduser/matchs/:idmatch/cotes/:idcote/bets', BetController.create);


export default router;