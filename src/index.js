require('dotenv').config()
const express = require('express')
const ind = require('./scrappers/indeed')
const methods = require('./utils/axiosMethods.js')
const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        const indeedData = await ind()
        await methods.createPost(indeedData)
    } catch (error) {
        console.log(error.message)
    }


}

start()

const app = express()

app.use((req, res) => {
    console.log('Something magic happend :o')
    res.status(200)
    res.send({Message: "Something magic happend"})
})

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})
