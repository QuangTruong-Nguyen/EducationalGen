'use client'
import {
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'

import { Pen, X } from 'lucide-react'


const providers = [
  {
    value: "openai",
    label: "OpenAI"
  },
  {
    value: "google",
    label: "Google"
  },
  {
    value: "anthropic",
    label: "Anthropic"
  },
  {
    value: "groq", 
    label: "Groq"
  },
]

const models = [
  {
    value: "gpt-4o",
    label: "gpt-4o"
  },
  {
    value: "gpt-4o-mini",
    label: "gpt-4o-mini"
  },
  {
    value: "gemini-1.5-flash",
    label: "gemini-1.5-flash"
  },
  {
    value: "gemini-2.0-flash",
    label: "gemini-2.0-flash"
  },
  {
    value: "claude-3-5-sonnet",
    label: "claude-3-5-sonnet"
  },
  {
    value: "deepseek-r1",
    label: "deepseek-r1"
  },
  {
    value: "llama-3.1-70b-versatile",
    label: "llama-3.1-70b-versatile"
  }, 
]


type Props = {}

const Agent = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [openModel, setOpenModel] = React.useState(false)
  const [valueModel, setValueModel] = React.useState("")

    return ( 
    <Card className="dark w-[350px]">
        <CardHeader>
          <CardTitle>Presentation Generator Agent</CardTitle>
        <CardDescription>Agent in charge of synthesizing the content of thepresentation, re-arrange template and update content for the presentation</CardDescription>
        </CardHeader>
    <CardFooter className="flex justify-between">
      <Badge className="bg-blue-500/50 text-white">gemini-2.0-flash</Badge>
      
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon">
            <Pen className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Agent Settings</SheetTitle>
            <SheetDescription>
              Setting up the agent: model, prompt, tools and other parameters
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value="Presentation Generator Agent" className="col-span-3" />
            </div>

            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline"
                    role="combobox" 
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value 
                      ? providers.find((provider) => provider.value === value)?.label
                      : "Select provider"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search provider..." />
                    <CommandList>
                      <CommandEmpty>No provider found.</CommandEmpty>
                      <CommandGroup>
                        {providers.map((provider) => (
                          <CommandItem 
                            key={provider.value} 
                            value={provider.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {provider.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
            <Popover open={openModel} onOpenChange={setOpenModel}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline"
                    role="combobox" 
                    aria-expanded={openModel}
                    className="w-[200px] justify-between"
                  >
                    {valueModel 
                      ? models.find((model) => model.value === valueModel)?.label
                      : "Select LLM Model"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search LLM Model..." />
                    <CommandList>
                      <CommandEmpty>No provider found.</CommandEmpty>
                      <CommandGroup>
                        {models.map((model) => (
                          <CommandItem 
                            key={model.value} 
                            value={model.value}
                            onSelect={(currentValue) => {
                              setValueModel(currentValue === valueModel ? "" : currentValue)
                              setOpenModel(false)
                            }}
                          >
                            {model.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Accordion type="single" collapsible className='w-full'>
                <AccordionItem value="item-1">
                  <AccordionTrigger>System Prompt</AccordionTrigger>
                  <AccordionContent>
                    You are assistant agent to help me generate slides for presentation.
                    Given the following images information. Given each slide have size 1920x1080 px:
                    Firstly, use given information to summarize and synthesize content for the presentation.
                    The first slide is COVER, only include title of the presentation and subtitle. 
                    The last slide is CLOSING, only include "Thanks for watching".
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Label htmlFor="tools">Tools</Label>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor="temperature">Temperature</Label>
              <Slider id="temperature" min={0} max={1} step={0.1} defaultValue={[0.5]} className="w-full pt-2" />
            </div>
            
            <div className='flex flex-col gap-2'>
              <Label htmlFor="top-p">Top P</Label>
              <Slider id="top-p" min={0} max={1} step={0.1} defaultValue={[0.5]} className="w-full pt-2" />
            </div>

          </div>

          <SheetFooter>
            <SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>

        </SheetContent>
      </Sheet>
      
    </CardFooter>
  </Card>
)
}

export default Agent;