'use client'
import { useEffect, useRef, useState } from "react";
let tokens: any;


const useWS = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string; type: string }[]>([]);
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null); // For scrolling

    const WS_URL = "ws://localhost:8000/ws";

    const websocket = new WebSocket(WS_URL);

    setWs(websocket); // Store the WebSocket instance in state

    websocket.onopen = () => {
      console.log('[CLIENT] Connected to WebSocket server');
    //   setMessages(prev => [...prev, {
    //     sender: 'System',
    //     text: 'Connected to server!',
    //     timestamp: new Date().toISOString(),
    //     type: 'system'
    //   }]);
    };

    websocket.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, parsedMessage]);
      } catch (error) {
        console.error('Error parsing message from server', error);
      }
    };

    websocket.onclose = () => {
      console.log('[CLIENT] Disconnected from WebSocket server');
    };

    websocket.onerror = (error) => {
      console.error('[CLIENT] WebSocket error:', error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
        websocket.close();
      }
    };
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('Not connected to WebSocket server!');
      return;
    }

    if (messageText.trim()) {
      const message = {
        type: 'message',
        text: messageText,
        sender: 'User', //  Set the sender
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(message)); // Send as JSON
      setMessageText(''); // Clear the input after sending
    }
  };



    const [ isConnected, setIsConnected ] = useState(false);
    const [ messages, setMessages ] = useState<any[]>([]);   // Array to store messages
    const [ error, setError ] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const maxReconnectAttempts = 5;
  
    const connect = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
  
      const ws = new WebSocket(url);
      wsRef.current = ws;
  
      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      }
  
    //   eventSource.addEventListener('streamToken',  function (event) {
    //     tokens = JSON.parse(event.data);
    //     console.log('streamToken', tokens);
    //     setMessages((prev) => [...prev, tokens.data]); 
    //     // updateCoordinates(tokens);
    //   });

      eventSource.onmessage = (event) => {
        try {
          console.log(event);
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);   // Append new message to the array
        } catch (err) {
          console.error("Failed to parse message:", err);
        }
      };      
  
      eventSource.onerror = () => {
        setIsConnected(false);
        setError("Connection lost, attempting to reconnect...");
        setMessages([]);
        eventSource.close();
        handleReconnect();
      };
    };
  
    const handleReconnect = () => {
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        const retryTimeout = 1000 * Math.pow(2, reconnectAttemptsRef.current);   // Exponential backoff
        setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connect();
        }, retryTimeout);
      } else {
        setError("Maximum reconnect attempts reached. Please check your connection and try again.");
      }
    };
    
    useEffect(() => {
      connect();
  
      return () => {
        eventSourceRef.current?.close();   // Clean up connection on unmount
      };  
    }, [url]);
    
    return { isConnected, messages, error };
  };

  export default useSSE;