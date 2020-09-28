const ind = require('./scrappers/indeed')

const start = async () => {
    try {
        const indeedData = await ind()
    } catch (error) {
        console.log(error)
    }
}

start()