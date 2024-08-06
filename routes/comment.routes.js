const express = require("express");
const router = express.Router()
const {createComment} = require("../controllers/comment.controller.js");
const {updateComment, getComments, getComment, deleteComment} = require("../controllers/comment.controller");

router.get('/', getComments)
router.post('/', createComment)
router.get('/:id', getComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router