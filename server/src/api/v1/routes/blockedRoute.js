import experss from 'express';
import * as blockedController from '../controllers/blockeds/blockeds.js';
import * as access from '../middlewares/accessMiddleware.js'

const router = experss.Router();

// endpoint: /api/v1/blocked

router.route('/')
    .get(access.grandAccess('readOwn', 'blocked'), blockedController.getBlockeds)


router.route('/:id(\[0-9a-f\]{24})')
    .get(access.grandAccess('readAny', 'blocked'), blockedController.getBlockedsByUserId)
    .post(access.grandAccess('createOwn', 'blocked'), blockedController.blockUser)
    .delete(access.grandAccess('deleteOwn', 'blocked'), blockedController.unblockUser);




export default router;