const express = require("express");
const router = express.Router()
const {createUser} = require("../controllers/user.controller.js");
const {updateUser, getUsers, getUser, deleteUser, sendEmail} = require("../controllers/user.controller");

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/send_email/:id', sendEmail)

module.exports = router