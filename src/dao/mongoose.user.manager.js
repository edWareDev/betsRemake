import mongoose from "mongoose"
import { User } from "../entities/user.js"
import { schemaUsers } from "./models/schemaUsers.js"
import bcrypt from "bcrypt"

class UsersManager {
    #usersDb
    constructor() {
        this.#usersDb = mongoose.model('user', schemaUsers)
    }
    async getUsers() {
        try {
            const allUsers = await this.#usersDb.find().lean()
            return allUsers
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }

    async addUser(user) {
        const newUser = new User({
            userName: user?.name,
            userLastName: user?.lastName,
            userDni: user?.dni,
            userPhone: user?.phone,
            userEmail: user?.email,
            userDateOfBirth: {
                day: user?.dob?.split("-")[2],
                month: user?.dob?.split("-")[1],
                year: user?.dob?.split("-")[0]
            },
            userAddress: {
                address: user?.address,
                district: user?.district,
                state: user?.state,
                region: user?.dept
            },
            userPassword: bcrypt.hashSync(user?.password, bcrypt.genSaltSync(10))
        })
        const findUser = await this.#usersDb.findOne({ userDni: newUser.userDni }).lean();
        if (findUser) {
            console.log('Se ha encontrado un usuario con el mismo documento');
            return ({ "error": "Se ha encontrado otro usuario con el mismo documento" })
        } else {
            console.log('No se ha encontrado un usuario con el mismo documento');
            const result = await this.#usersDb.create(newUser)
            return result
        }
    }

    async loginUser(user) {
        const userReceived = {
            userEmail: user.email,
            userPassword: user.password
        }
        const findUser = await this.#usersDb.findOne({ userEmail: userReceived.userEmail }).lean();
        if (findUser) {
            return bcrypt.compareSync(userReceived.userPassword, findUser.userPassword)
        }
        return { 'state': 'No fue posible iniciar sesión' }
    }
}

export const usersManager = new UsersManager()