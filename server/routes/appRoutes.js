import  express  from "express";
import appControllers from "../controllers/appControllers.js";

const router = express.Router()

router.route('/seed').get(appControllers.seedDB)
router.route('/').get(appControllers.getAllRecipes)
router.route('/addrecipe').post(appControllers.addRecipe)
router.route('/deleterecipe').delete(appControllers.deleteRecipe)
router.route('/updaterecipe').patch(appControllers.updateRecipe)
router.route('/searchrecipe').get(appControllers.searchRecipes)


export default router