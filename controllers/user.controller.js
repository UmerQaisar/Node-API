const prisma = require('../db/db.config.js');

const createUser = async (req, res) => {
    try{
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
    }catch (err){
        console.log("Error: " + err.message)
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const {name, email, password} = req.body

        const user = await prisma.user.update({
            where: {id: Number(id)},
            data: {name: name, email: email, password: password}
        })

        return res.json({status: 200, data: user, message: 'User updated successfully'})
    }catch (err){
        console.log("Error: " + err.message)
    }
}

const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await prisma.user.findFirst({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: user})
    }catch (err){
        console.log("Error: " + err.message)
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany({})

        return res.json({status: 200, data: users})
    }catch (err){
        console.log("Error: " + err.message)
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await prisma.user.delete({
            where: {id: Number(id)},
        })

        return res.json({status: 200, data: user, message: "User deleted successfully"})
    }catch (err){
        console.log("Error: " + err.message)
    }
}

module.exports = {createUser, updateUser, getUsers, getUser, deleteUser}