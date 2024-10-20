import { WebSocketServer } from 'ws'; // Use named import

// Create a WebSocket server that listens on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a message to all connected clients once a second
  const intervalId = setInterval(() => {
    ws.send('What is your counter value?');
  }, 1000);

  // Listen for messages from the clients
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(`Client counter value: ${data.counter}`);
  });

  // Clean up the interval when the client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
