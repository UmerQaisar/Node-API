const prisma = require('../db/db.config.js');
const jwt = require("jsonwebtoken");
const sendEmailQueue = require('../queue/email.queue.js')

const loginUser = async (req, res) => {
    const {email, password} = req.body
    user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    })
    if(user){
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }else{
        res.json({status: 500, message: 'User not found'});
    }
}

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const findUser = await prisma.user.findUnique({
            where: {email: email}
        })

        if (findUser) {
            return res.json({status: 400, message: 'User already exists'})
        }

        const user = await prisma.user.create({
            data: {name: name, email: email, password: password}
        })

        return res.json({status: 200, data: user, message: 'User created successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, email, password} = req.body

        const user = await prisma.user.update({
            where: {id: Number(id)},
            data: {name: name, email: email, password: password}
        })

        return res.json({status: 200, data: user, message: 'User updated successfully'})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findFirst({
            where: {id: Number(id)},
            include: {
                _count: {
                    select: {
                        post: true
                    }
                }
            }
        })

        return res.json({status: 200, data: user})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                post: {
                    select: {
                        title: true,
                        description: true,
                        comment: true
                    }
                },
            }
        })

        return res.json({status: 200, data: users})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.delete({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: user, message: "User deleted successfully"})
    } catch (err) {
        console.log("Error: " + err.message)
        return res.json({status: 500})
    }
}

const sendEmail = async (req, res) => {
    const {emailBody} = req.body
    await sendEmailQueue(emailBody);
    return res.json({message: "Email sent successfully"})
}

module.exports = {createUser, updateUser, getUsers, getUser, deleteUser, loginUser, sendEmail}