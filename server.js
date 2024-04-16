// server.js

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (pathname === '/sign-in') {
            // Render your sign-in page here
            app.render(req, res, '/sign-in', parsedUrl.query);
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(3000, err => {
// sourcery skip: use-braces
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
