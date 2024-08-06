const prisma = require('../db/db.config.js');

const createPost = async (req, res) => {
    try {
        const {user_id, title, description} = req.body

        const post = await prisma.post.create({
            data: {
                user_id: Number(user_id),
                title,
                description
            }
        })

        return res.json({status: 200, data: post, message: 'Post created successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const {user_id, title, description} = req.body

        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: {
                user_id: Number(user_id),
                title,
                description
            }
        })

        return res.json({status: 200, data: post, message: 'Post updated successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prisma.post.findFirst({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: post})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                comment: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return res.json({status: 200, data: posts})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prisma.post.delete({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: post, message: "Post deleted successfully"})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

module.exports = {createPost, updatePost, getPosts, getPost, deletePost}