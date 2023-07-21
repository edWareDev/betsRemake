import mongoose from "mongoose";

export const schemaCustomers = new mongoose.Schema({
    customerName: { type: String, required: false },
    customerDni: { type: String, required: true },
    customerPhone: { type: Number, required: false },
    customerEmail: { type: String, required: false },
    customerGender: { type: String, required: false },
    customerDateOfBirth: {
        type: {
            day: Number,
            month: Number,
            year: Number,
        },
        required: false
    },
    customerAddress: {
        type: {
            address: String,
            district: String,
            state: String,
            region: String
        },
        required: false
    },
    verifiedData: { type: Object, required: false },
    customerAuthorization: { type: Boolean, required: false }
}, { versionKey: false });
