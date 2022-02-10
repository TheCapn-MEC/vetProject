// const express = require('express');
const express = require('express');
const router = express.Router();

// const { getAllAccounts, getOneAccount } = require('../controllers/LoginControllers')
const { getAllAccounts, getOneAccount } = require('../controllers/LoginControllers.js')

//Controllers for application
router.route('/').get(getAllAccounts)
router.route('/:id').get(getOneAccount)
// router.route('/login').(hash)
// .post(createNewAccount.patch(updateAccount).delete(deleteAccount););

// module.exports = router;
module.exports = { getAllAccounts, getOneAccount }