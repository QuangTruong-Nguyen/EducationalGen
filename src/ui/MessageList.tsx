import { cn } from '@/lib/utils';
// import { Message } from '@ai-sdk/react';
import React from 'react'
import { Bot, CircleUserRound } from 'lucide-react';
import ReactMarkdown from 'react-markdown'
import Image from 'next/image';

interface Message {
    role: 'agent' | 'user';
    timestamp: Date;
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

type Props = {
    messages: Message[]
}

const MessageList = ({messages}: Props) => {
    if (!messages) return <></>
        
    return (
        <div className='flex flex-col gap-2 px-4'>
            {messages.map((message) => {
                return (
                    <div className='flex flex-col gap-2 px-4'>
                        <div className="flex w-12 h-12 rounded-full p-1 items-center justify-center">
                            {message.role === 'user' && <CircleUserRound className='w-8 h-8' />}
                            {message.role === 'agent' && <Image src="/images/bot.gif"
                                                                    alt="Animated GIF"
                                                                    width={300} // Specify the desired width
                                                                    height={300} // Specify the desired height
                            />}
                        </div>

                        <div className={cn('flex p-4', {
                            'justify-end pl-10': message.role === 'user',
                            'justify-start pr-10': message.role === 'agent',
                        })}
                        >
                            <div className={cn(
                                "rounded-lg px-3 text-sm text-justify py-1 shadow-md ring-1 ring-gray-900/10", {
                                    "bg-blue-600 text-white": message.role === 'user'
                                })}>
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )})
            }
        </div>
    );
}


export default MessageList;