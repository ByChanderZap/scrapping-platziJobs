require('dotenv').config()
const ind = require('./scrappers/indeed')
const methods = require('./utils/axiosMethods.js')

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


start()