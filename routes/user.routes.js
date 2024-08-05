const express = require("express");
const router = express.Router()
const {createUser} = require("../controllers/user.controller.js");
const {updateUser, getUsers, getUser, deleteUser} = require("../controllers/user.controller");

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router