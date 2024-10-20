import React, { useState, useEffect, useRef } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const ws = useRef(null); // To store WebSocket instance

  useEffect(() => {
    // Create WebSocket connection.
    ws.current = new WebSocket('ws://localhost:8080');

    // Listen for messages from the WebSocket server
    ws.current.onmessage = (message) => {
      const serverMessage = message.data;
      console.log(`Message from server: ${serverMessage}`);

      // Server asks for the current counter value
      if (serverMessage === 'What is your counter value?') {
        ws.current.send(JSON.stringify({ counter }));
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [counter]);

  // Increment counter by 1
  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={incrementCounter}>Increase Counter</button>
    </div>
  );
};

export default Counter;
