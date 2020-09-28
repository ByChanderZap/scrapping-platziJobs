const cheerio = require('cheerio')
const request = require('request-promise')
const URI = 'https://www.indeed.com.mx/jobs?q=programador&l=Guadalajara%2C+Jal.'

const scrap = async() => {
    const $ = await request({
        uri: URI,
        transform: body => cheerio.load(body)
    })

    let posts = []

    const element = $('div.jobsearch-SerpJobCard').each((i, el) => {
        let newPost = {}
        const position = $(el).find('h2.title').text().replace(/(\n){1,}/g, "")
        //  console.log(title)
        const joburl = `https://www.indeed.com.mx` + $(el).find('h2.title a').attr('href')
        const image = 'https://lh3.googleusercontent.com/gUyHrmCpcy5rRMY68W5csIEj60ORJmoqvTr8_WWYL8bDv6hlnKeE_twq5Pw1Y4X3FzI'
        const description = $(el).find('div.summary').text().replace(/(\n){1,}/g, "")
        const company = $(el).find('div.sjcl div span.company').text().replace(/(\n){1,}/g, "")
        const skill = ['Programacion']
        const country = 'mexico'
        const city = $(el).find('div.sjcl span.location').text().split(',')[0].toLowerCase()
        
        newPost = {
            position,
            image,
            description,
            company,
            url: joburl,
            skill,
            country,
            city
        }
        posts.push(newPost);
    })

    return posts
}

module.exports = scrap