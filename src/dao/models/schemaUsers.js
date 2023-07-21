import mongoose from "mongoose";

export const schemaUsers = new mongoose.Schema({
    userName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userDni: { type: String, required: true },
    userPhone: { type: Number, required: false },
    userEmail: { type: String, required: true, unique: true },
    userGender: { type: String, required: false },
    userDateOfBirth: {
        type: {
            day: Number,
            month: Number,
            year: Number,
        },
        required: false
    },
    userAddress: {
        type: {
            address: String,
            district: String,
            state: String,
            region: String
        },
        required: false
    },
    userPassword: { type: String, required: true }
}, { versionKey: false })