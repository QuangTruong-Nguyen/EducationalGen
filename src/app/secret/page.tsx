'use client'

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Eye, EyeOff, Pen } from "lucide-react"

type Props = {}

const handleClick = () => {
    toast("Saved changes", {
        description: "Your changes have been saved"
    })
}


export default function Secret({}: Props) {
  return (
    <div>
        <Card className="w-[350px] dark">
            <CardHeader>
                <CardTitle>Secret</CardTitle>
                <CardDescription>Set up your secrets</CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Unstructured API Key</Label>
                            <div className="flex flex-row">
                                <Input className="border-0 dark:focus:border-2 dark:focus:border-teal-500 dark:focus:ring-0 rounded-full" id="name" placeholder="UNSTRUCTURED_API_KEY" />
                                <Button className="p-2" variant="ghost" size="icon">
                                    <Eye />
                                </Button>

                                <Button className="p-2" variant="ghost" size="icon">
                                    < Pen />
                                </Button>
                            </div>
                            
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Google API Key</Label>
                            <div className="flex flex-row">
                                <Input className="border-0 dark:focus:border-2 dark:focus:border-teal-500 dark:focus:ring-0 rounded-full" id="name" placeholder="GOOGLE_API_KEY" />
                                <Button className="p-2" variant="ghost" size="icon">
                                    <Eye />
                                </Button>

                                <Button className="p-2" variant="ghost" size="icon">
                                    < Pen />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Google Slide URL</Label>
                            <div className="flex flex-row">
                                <Input className="border-0 dark:focus:border-2 dark:focus:border-teal-500 dark:focus:ring-0 rounded-full" id="name" placeholder="GOOGLE_SLIDE_URL" />
                                <Button className="p-2" variant="ghost" size="icon">
                                    <Eye />
                                </Button>

                                <Button className="p-2" variant="ghost" size="icon">
                                    < Pen />
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button className="rounded-full" onClick={() => {
                    toast("Saved changes", {
                        description: "Your changes have been saved"
                    })
                }}>Save</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
