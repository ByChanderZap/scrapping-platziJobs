const ind = require('./scrappers/indeed')

const start = async () => {
    try {
        const indeedData = await ind()
        console.log(indeedData)
    } catch (error) {
        console.log(error)
    }
}

start()