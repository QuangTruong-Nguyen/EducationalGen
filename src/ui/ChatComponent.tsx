'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@ai-sdk/react'
import MessageList  from './MessageList'
import ResultTab from './ResultTab'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import { todo } from 'node:test'

interface Message {
  role: 'agent' | 'user';
  timestamp: string;
  content: string;
}

type Conversation = Message[];

function addMessage(conversation: Conversation, role: 'agent' | 'user', text: string): Conversation {
  const newMessage: Message = {
      role: role,
      timestamp: new Date(),
      content: text,
  };

  return [...conversation, newMessage];
}

interface Task {
  task_id: number;
  description: string;
  status: "pending" | "done";
}

interface TODOList {
  tasks: Task[];
}

let result: {
  todoList: Array<{
      task_id: string;
      description: string;
      status: string;
  }>,

  curriculum: {
      title: string;
      overview: string;
      modules: Array<{
          title: string;
          content: string;
      }> | null;
  },
  lectureNotes: Array<string>;
}    

type Props = {}

const ChatComponent = (props: Props) => {
    // const { input, handleInputChange, handleSubmit, messages } = useChat({
    //     api: '/api/chat'
    // });
    
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Conversation>([]);
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null); // For scrolling
    const [isVisible, setIsVisible] = useState(true);
  
    // WebSocket connection setup on component mount
    useEffect(() => {
      // Use a relative URL that works in development and production
      const WS_URL = typeof window !== 'undefined'
        ? `ws://${window.location.hostname}:8000/ws` // Connect to the same host, different port
        : `ws://localhost:8000/ws`; // Fallback for server-side rendering (though it won't connect)
  
  
      const websocket = new WebSocket(WS_URL);
  
      setWs(websocket); // Store the WebSocket instance in state
  
      websocket.onopen = () => {
        console.log('[CLIENT] Connected to WebSocket server');
      };
  
      websocket.onmessage = (event) => {
        try {
          const parsedMessage = JSON.parse(event.data);
          console.log(parsedMessage);
          
          if (parsedMessage.hasOwnProperty("role")) {
            setMessages((prev) => [...prev, parsedMessage]);
          } else {
            result = parsedMessage;
          }

          {/*Get TODOList from result*/}
          // const todoList = content.todo_list as TODOList

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
    }, []); // Empty dependency array ensures this runs only once on mount
  
    // Scroll to bottom when new messages arrive
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault(); // Prevent the default form submission behavior (page reload)
  
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        alert('Not connected to WebSocket server!');
        return;
      }
  
      if (messageText.trim()) {
        const message: Message = {
          content: messageText,
          role: 'user', 
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, message]);

        ws.send(JSON.stringify(message)); // Send as JSON
        setMessageText(''); // Clear the input after sending
      }
    };
       
    return (
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-screen max-h-screen rounded-lg"
          >
            <ResizablePanel defaultSize={60} minSize={40}>
              <div className="w-full h-full grid grid-rows-10 gap-4 p-4">
                <div className="">
                    <h3 className="text-lg text-slate-700 font-semibold">Introduction to Artificial Intelligence</h3>
                </div>

                {/* message list */}
                <ScrollArea className="border rounded-xl row-span-8">
                    <MessageList messages={messages} />
                </ScrollArea>
                
                {/* text area */}
                <div className="row-span-2">
                  <form onSubmit={(e) => handleSendMessage(e)} className="w-full flex flex-row items-center">
                     <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} 
                            placeholder='Type your message ...' 
                            className="grow focus:border-2 focus:border-sky-500 ring-0 focus:ring-0 flex-row"
                     />
                     <Button className="w-10 flex-none bg-blue-500 ml-2">
                         <Send className='w-4 h-4' />
                     </Button>
                 </form>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle/>

            <ResizablePanel className="" defaultSize={40} minSize={40}>
                  <ResultTab result={result}/>
                  <div className="flex rounded-xl h-full items-center justify-center p-10">

                    <Image src="/images/bot.gif"
                          alt="Animated GIF"
                          width={100} // Specify the desired width
                          height={100} // Specify the desired height
                    />

                    <Image src="/images/animation-0.gif"
                          alt="Animated GIF"
                          width={100} // Specify the desired width
                          height={100} // Specify the desired height
                    />

                    <Image src="/images/animation-1.gif"
                          alt="Animated GIF"
                          width={100} // Specify the desired width
                          height={100} // Specify the desired height
                    />

                    <Image src="/images/animation-2.gif"
                          alt="Animated GIF"
                          width={100} // Specify the desired width
                          height={100} // Specify the desired height
                    />

                    <Image src="/images/animation-3.gif"
                          alt="Animated GIF"
                          width={100} // Specify the desired width
                          height={100} // Specify the desired height
                    />
                  </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )
}

export default ChatComponent
