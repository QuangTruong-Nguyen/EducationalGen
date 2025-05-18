'use client'
import {
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

import React from 'react'
import ReactMarkdown from 'react-markdown'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import { List } from '@radix-ui/react-tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import {
    ListTodo,    
    ScrollText,
    NotebookPen,
    Presentation,
    FileQuestion,
    MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Props = {
    result: {
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
                task_id: string;
            }>
        } | null,
        
        lectureNotes: Array<string>;
    }    
}

const ResultTab = ({ result = { todoList: [], curriculum: {title: '', overview: '', modules: []}, lectureNotes: [] } }: Props) => {
    return (
        <Tabs defaultValue='todolist' className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="todolist">
                    <ListTodo className="w-8 h-8"/>
                </TabsTrigger>
                <TabsTrigger value="curriculum">
                    <ScrollText className='w-8 h-8'/>
                </TabsTrigger>
                <TabsTrigger value="lecture-note">
                    <NotebookPen className='w-8 h-8'/>
                </TabsTrigger>
                <TabsTrigger value="presentation">
                    <Presentation className='w-8 h-8' />
                </TabsTrigger>
                <TabsTrigger value="quiz">
                    <FileQuestion className='w-8 h-8' />
                </TabsTrigger>
            </TabsList>

            <TabsContent value='todolist'>
                <ScrollArea>
                    <div className="">
                        {result.todoList?.map((task) => (
                        <div className="flex space-x-2 space-y-2 ml-5 mt-2">
                            <Checkbox id={task.task_id} 
                                    checked={task.status == "done"} 
                                    className="data-[state=checked]:rounded-full border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:border-none"/>
                            <Label className="" htmlFor={task.task_id}>{task.description}</Label>
                        </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>

            <TabsContent value="curriculum">
                <ScrollArea className="h-screen">
                    <div>
                        <div className="items-center p-6">
                            <h1 className="font-bold text-2xl text-center p-2">{result.curriculum?.title}</h1>
                            <p className="text-justify">
                                <ReactMarkdown>{result.curriculum?.overview}</ReactMarkdown>
                            </p>
                        </div>
                        <Accordion type="single" collapsible className='w-full border border-2 m-2 rounded-2xl p-2'>
                            {result.curriculum?.modules?.map((module, index) => (
                                <AccordionItem key={`module-${index}`} value={`item-${index + 1}`}>
                                    <AccordionTrigger>{module.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <p>
                                            <ReactMarkdown>{module.content}</ReactMarkdown>
                                        </p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Badge>
                                                    <NotebookPen className="w-4 h-4"/>
                                                </Badge>
                                            </DialogTrigger>
                                            

                                            <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-slate-950">Lecture Note</DialogTitle>
                                                    <DialogDescription></DialogDescription>
                                                </DialogHeader>

                                                <ScrollArea className="h-[400px]">
                                                    <div className="w-2/3">
                                                        <ReactMarkdown>
                                                            {result.lectureNotes && index < result.lectureNotes.length ? result.lectureNotes[index] : ""}
                                                        </ReactMarkdown>
                                                    </div>
                                                    <ScrollBar />
                                                </ScrollArea>
                                                
                                            </DialogContent>
                                        </Dialog>
                                    </AccordionContent>
                                </AccordionItem>  
                            ))}
                        </Accordion>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </TabsContent>

            <TabsContent value="presentation">

            </TabsContent>

            <TabsContent value="quiz">

            </TabsContent>
        </Tabs>
    )
}

export default ResultTab;