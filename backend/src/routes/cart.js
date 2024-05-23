import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verfy_token';
import { isCreatorOrAdmin, isAdmin } from '../middlewares/verify_role'


const router = express.Router()


router.use(verifyToken)
router.use(isCreatorOrAdmin)



router.post('/', controllers.addCart)
router.get('/', controllers.getCart)




module.exports = router