import * as axios from 'axios'
import * as fs from 'fs'

const testData = JSON.parse(fs.readFileSync('./assets/test_data.json', 'utf-8'))
const endpoints = JSON.parse(fs.readFileSync('./assets/endpoints.json', 'utf-8'))

const host = `${endpoints.protocol}${endpoints.host}`

describe('Auth',  () => {
    it('should create a new user', async () => {
        await axios.default.post(`${host}${endpoints.register}`, testData.loginAndRegister.registerData)
            .then(r => {
                const responseData = r.data
                expect(responseData.error).toBe(false)
                expect(responseData.message).toBe("Account created successfully, you're already logged in")
                expect(responseData.token).not.toBe(undefined)

                testData.contacts.add.token = responseData.token
                testData.contacts.wrongTestData.token = responseData.token
            })
            .catch(err => {
                expect(err).toBe(undefined)
            })
    })

    it('should return -> invalid email bad request message', async () => {
        await axios.default.post(`${host}${endpoints.register}`, testData.loginAndRegister.wrongTestData)
            .then(() => {
                expect(true).toBe(false)
            })
            .catch((err) => {
                const responseData = err.response.data
                expect(responseData.error).toBe(true)
                expect(responseData.message).toBe("Your email is not valid")
                expect(responseData.token).toBe(undefined)
            })
    })

    it('should throw error message', async () => {
        await axios.default.post(`${host}${endpoints.login}`, testData.loginAndRegister.loginData)
            .then(() => {
                expect(true).toBe(false)
            })
            .catch(err => {
                const responseData = err.response.data
                expect(responseData.error).toBe(true)
                expect(responseData.message).toBe("Something went wrong.")
                expect(responseData.token).toBe(undefined)
            })
    })
})

describe("Adding Contacts", () => {
    it("should add contacts", async () => {
        await axios.default.post(`${host}${endpoints.addContacts}`, testData.contacts.add)
            .then(r => {
                const responseData = r.data
                expect(responseData.error).toBe(false)
                expect(responseData.message).toBe("Contacts were successfully added to your account")
                expect(responseData.token).not.toBe(undefined)
            })
            .catch(err => {
                expect(err).toBe(undefined)
            })
    })

    it("should throw error message -> bad request", async () => {
        await axios.default.post(`${host}${endpoints.addContacts}`, testData.contacts.wrongTestData)
            .then(r => {
                expect(true).toBe(false)
            })
            .catch(err => {
                const responseData = err.response.data
                expect(responseData.error).toBe(true)
                expect(responseData.message).toBe("Something went wrong.")
                expect(responseData.token).toBe(undefined)

                testData.contacts.add.token = "lolGoBack2Work->->-><3"
            })
    })

    it("should throw error message -> invalid token", async () => {
        await axios.default.post(`${host}${endpoints.addContacts}`, testData.contacts.add)
            .then(r => {
                expect(true).toBe(false)
            })
            .catch(err => {
                const responseData = err.response.data
                expect(responseData.error).toBe(true)
                expect(responseData.message).toBe("Your token is invalid")
                expect(responseData.token).toBe(undefined)
            })
    })
})