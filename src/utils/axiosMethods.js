const axios = require('axios')

const getPage = async (url) => {
    const page = await axios.get(url)
    return page
}

module.exports = {
    getPage
}