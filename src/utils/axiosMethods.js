const Axios = require('axios')
const fullBearer = 'Bearer ' + process.env.BEARER

const getPage = async (url) => {
    const page = await Axios.get(url)
    return page
}

const postInstance = Axios.create({
    headers: {
        "Authorization": fullBearer
    }
})

const sendPost = async (data) => {
    try {
        const response = await postInstance.post('https://social-jobs-dev-back.herokuapp.com/api/post/create', data)
    } catch (error) {
        console.log(error.response.status)
    }
}

const createPost = async (data) => {
    data.forEach(element => {
        sendPost(element)
    });
}

module.exports = {
    getPage,
    createPost
}