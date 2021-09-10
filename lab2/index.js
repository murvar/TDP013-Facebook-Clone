const http = require('http')
const url = require('url')
http.createServer((request, response) => {
 response.writeHead(200, {'Content-Type' : 'text/html'})
 let urlParts = url.parse(request.url, true)
 let name = urlParts.query['name'] || 'World'
 let phone = urlParts.query['phone']
 response.write(`<h1>Hello ${name}!</h1>`)
 if(phone){
 response.write(`<p>Is you're phone number ${phone}?</p>`)
 }
 response.end()
}).listen(8888) 