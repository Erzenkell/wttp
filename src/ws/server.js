import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocketServer listening on port 8080\n');

wss.on('connection', (client) => {
    console.log('client connected');
    client.on('message', (message) => {
        console.log('received: %s', message);
        broadcast(message);
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}