const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head>' +
            '<title>Main page</title>' +
            '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
            '</head>');
        res.write('<body><br>' +
            '<h1>Type in the path to directory</h1><br>' +
            '<form action="/find" method="POST" ><input type="url" name="path"><button type="submit">Calculate</button>' +
            '</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/find' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const path = Buffer.concat(body).toString().split('=')[1].toString();
            console.log(body.toString());
        })
        res.statusCode = 200;
        return res.end();
    }
});
server.listen(3000);