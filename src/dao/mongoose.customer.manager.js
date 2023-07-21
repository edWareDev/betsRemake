import mongoose from "mongoose"
import { Customer } from "../entities/customer.js"
import { schemaCustomers } from "./models/schemaCustomers.js"
import { fetchData } from "../functions/fetchDNIData.js"

class CustomersManager {
    #customersDb
    constructor() {
        this.#customersDb = mongoose.model('customer', schemaCustomers)
    }
    async getCustomers() {
        try {
            const allCustomers = await this.#customersDb.find().lean()
            return allCustomers
        } catch (error) {
            throw new Error({ error: error.message })
        }
    }

    async addCustomer(customer) {
        const newCustomer = new Customer({
            customerName: customer?.name,
            customerDni: customer?.dni,
            customerPhone: customer?.phone,
            customerEmail: customer?.email,
            customerGender: customer?.gender,
            customerDateOfBirth: {
                day: customer?.dob?.day,
                month: customer?.dob?.month,
                year: customer?.dob?.year
            },
            customerAddress: {
                address: customer?.address,
                district: customer?.district,
                state: customer?.state,
                region: customer?.region
            },
            customerAuthorization: customer?.authorization
        })
        newCustomer.verifiedData = await fetchData(newCustomer.customerDni)
        const findCustomer = await this.#customersDb.findOne({ customerDni: newCustomer.customerDni }).lean();
        if (findCustomer) {
            console.log('Se ha encontrado un usuario con el mismo documento');
            const customerDateOfBirth = {
                ...newCustomer.customerDateOfBirth,
                ...findCustomer.customerDateOfBirth
            };
            const customerAddress = {
                ...newCustomer.customerAddress,
                ...findCustomer.customerAddress
            };
            const customerNuevo = {
                ...newCustomer,
                ...findCustomer,
                customerDateOfBirth: customerDateOfBirth,
                customerAddress
            };
            const result = await this.#customersDb.findOneAndUpdate({ customerDni: newCustomer.customerDni }, customerNuevo, { new: true })

            return result
        } else {
            console.log('No se ha encontrado un usuario con el mismo documento');
            const result = this.#customersDb.create(newCustomer)
            return result
        }
    }
}

export const customersManager = new CustomersManager()