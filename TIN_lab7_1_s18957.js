const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Main Page</title></head>');
        res.write('<body><br>' +
            '<h1>Here is a Simple calculator. Write down two numbers on which you want to perform the operations:</h1><br>' +
            '<form action="/calculate" method="POST"><input type="text" name="data"><button type="submit">Calculate</button>' +
            '</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/calculate' && method === 'POST') {

        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            console.log(body.toString());
            const data = Buffer.concat(body).toString().split('=')[1].toString().replace(/[+]+/, ' ').split(/\s+/);
            const numb_1 = Number.parseInt(data[0]);
            const numb_2 = Number.parseInt(data[1]);
            const sum = numb_1 + numb_2;
            const sub = numb_1 - numb_2;
            const mult = numb_1 * numb_2;
            let divide = 0;
            if (numb_2 !== 0) {
                divide = numb_1 / numb_2;
            }
            res.write('<html>');
            res.write('<head><title>Main Page</title></head>');
            res.write('<body><br>' +
                'SUM: ' + sum.toString() +
                ' SUB: ' + sub.toString() +
                ' MULT: ' + mult.toString() +
                ' DIV: ' + divide.toString() +
                '</body>');
            res.write('</html>');
            res.statusCode = 200;
            return res.end();
        });
    }
});
server.listen(3000);