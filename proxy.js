import { createServer } from 'node:http';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Max-Age': '1728000',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
}

createServer(function (req, res) {
    if (req.method === 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
        return;
    }

    function fetchServer(body = null) {
        fetch(`http://localhost:8080${req.url}`, {
            method: req.method,
            redirect: 'error',
            body,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': req.headers.authorization,
            }
        })
            .then(async response => {
                const body = await response.json();
                res.writeHead(response.status, headers);
                res.write(JSON.stringify(body));
                res.end();
            })
    }

    if (req.method === 'GET') {
        fetchServer();
    } else {
        let body = "";
        req.on('readable', function () {
            body += req.read();
        });
        req.on('end', () => fetchServer(body));
    }
}).listen(8082);
