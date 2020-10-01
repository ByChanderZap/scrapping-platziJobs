require('dotenv').config()
const express = require('express')
const ind = require('./scrappers/indeed')
const methods = require('./utils/axiosMethods.js')
const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        const indeedData = await ind()
        //  const sup = await methods.sendPost(POST_URI, indeedData)
        await methods.createPost(indeedData)

        //  console.log(sup.status)
    } catch (error) {
        console.log(error.message)
    }


}

const app = express()

app.use((req, res) => {
    start()
    console.log('Something magic happend :o')
    res.status(200)
    res.send({Message: "Something magic happend"})
})

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})
