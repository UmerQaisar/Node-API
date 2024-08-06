const express = require("express");
const router = express.Router()
const {createPost} = require("../controllers/post.controller.js");
const {updatePost, getPosts, getPost, deletePost} = require("../controllers/post.controller");

router.get('/', getPosts)
router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router