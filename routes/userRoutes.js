const router = require('express').Router();

const {
	register,
	activatedAccount,
	login,
	getAllUsers,
	deleteUser
} = require('../controllers/userController');

router.post('/register', register);
router.get('/activatedaccount/:token', activatedAccount);
router.post('/login', login);
router.get('/all', getAllUsers);
router.delete('/delete/:id', deleteUser);

module.exports = router;
