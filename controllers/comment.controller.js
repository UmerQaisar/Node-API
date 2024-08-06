const prisma = require('../db/db.config.js');

const createComment = async (req, res) => {
    try {
        const {user_id, post_id, comment} = req.body

        const response = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment
            }
        })

        if(response){
            await prisma.post.update({
                where: {
                    id: Number(post_id),
                },
                data: {
                    comment_count: {
                        increment: 1
                    }
                }
            })
        }

        return res.json({status: 200, data: response, message: 'Comment created successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const {user_id, post_id, comment} = req.body

        const response = await prisma.comment.update({
            where: {id: Number(id)},
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment
            }
        })

        return res.json({status: 200, data: response, message: 'Comment updated successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await prisma.comment.findFirst({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: comment})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({})

        return res.json({status: 200, data: comments})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await prisma.comment.delete({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: comment, message: "Comment deleted successfully"})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

module.exports = {createComment, updateComment, getComments, getComment, deleteComment}