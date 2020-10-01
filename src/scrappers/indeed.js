const cheerio = require('cheerio')
const URI = 'https://www.indeed.com.mx/trabajo?q=programador&l=M%C3%A9xico'
const ask = require('../utils/axiosMethods.js')

const scrap = async() => {
    const page = await ask.getPage(URI)
    const $ = cheerio.load(page.data)

    let posts = []

    const element = $('div.jobsearch-SerpJobCard').each((i, el) => {
        let newPost = {}
        const position = $(el).find('h2.title').text().replace(/(\n){1,}/g, "")
        //  console.log(title)
        const joburl = `https://www.indeed.com.mx` + $(el).find('h2.title a').attr('href')
        const image = 'https://lh3.googleusercontent.com/gUyHrmCpcy5rRMY68W5csIEj60ORJmoqvTr8_WWYL8bDv6hlnKeE_twq5Pw1Y4X3FzI'
        const salary = $(el).find('span.salaryText').text().replace(/[^0-9\ ]/g, "").split(' ')[0] || 6000
        const description = $(el).find('div.summary').text().replace(/(\n){1,}/g, "")
        const company = $(el).find('div.sjcl div span.company').text().replace(/(\n){1,}/g, "")
        const skill = ['Programacion']
        const country = 'mexico'
        const city = $(el).find('div.sjcl span.location').text().split(',')[0].toLowerCase() || "No especificado"
        const user = process.env.USER_ID
        
        newPost = {
            position,
            image,
            rating: ['0'],
            salary: parseFloat(salary),
            description,
            company,
            url: joburl,
            skill,
            user,
            country,
            city
        }
        posts.push(newPost);
    })

    return posts
}

module.exports = scrap
