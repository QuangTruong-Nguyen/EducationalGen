'use client'
import React, { useState } from "react";
import { Calendar, Home, Workflow, Plus, Search, Settings, KeyRound,
    GraduationCap, LibraryBig, ScrollText,
    ChevronDown,
    NotebookPen,
    Presentation,
    FileQuestion,
    MessageCircle
} from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,   
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import UploadDrawer from "@/ui/UploadDrawer"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image'

// Menu items
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    // {
    //     title: "Agent Workflow",
    //     url: "/multiagent",
    //     icon: Workflow,
    // },
    {
        title: "Chat",
        url: "/chat",
        icon: MessageCircle,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
    {
        title: "Secrets",
        url: "/secret",
        icon: KeyRound,
    },
]

// Đảm bảo UploadDrawer nhận prop onUploadSuccess
export function AppSidebar() {
    const router = useRouter()
    // State lưu các file đã upload
    const [uploadedFiles, setUploadedFiles] = useState<{ file_key: string; file_name: string }[]>([]);

    // Callback khi upload thành công
    const handleUploadSuccess = (fileInfo: { file_key: string; file_name: string }) => {
        setUploadedFiles((prev) => [...prev, fileInfo]);
    };

    return (
        <Sidebar className="dark" collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-end items-center">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent className="dark">
                <SidebarGroup className="dark">
                    <SidebarGroupLabel className="text-md dark">
                        <LibraryBig className="dark:text-white" />
                        <span className="p-2">Sources</span>
                    </SidebarGroupLabel>
                    <SidebarGroupAction title="Add new source">
                        <UploadDrawer onUploadSuccess={handleUploadSuccess}>
                            <Plus /> 
                        </UploadDrawer>
                        <span className="sr-only">Add new chat</span>
                    </SidebarGroupAction>
                    {/* Hiển thị tên file PDF đã upload */}
                    {uploadedFiles.length > 0 && (
                        <div className="pl-8 pt-2 space-y-1">
                            {uploadedFiles.map((file) => (
                                <div key={file.file_key} className="text-white text-xs truncate flex items-center gap-2">
                                    <Image 
                                        src="pdf.svg"
                                        alt="PDF Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <p className="truncate">{file.file_name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </SidebarGroup>
                    
                <Collapsible defaultOpen className='group/collapsible'>
                    <SidebarGroup className="dark">
                        <SidebarGroupLabel asChild className="text-md dark">
                            <CollapsibleTrigger>
                                Results
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                            <SidebarGroupContent className="dark">
                                <SidebarMenu className="dark">
                                    {items.map((item) => (
                                        <SidebarMenuItem className="dark py-1" key={item.title}>
                                            <SidebarMenuButton asChild size="md">
                                                <Link href={item.url}>
                                                    <item.icon className='w-24 h-24 dark:text-white' />
                                                    <span className="text-md ml-2 dark:text-white">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter>
                <header className="flex items-center gap-4">
                    <SignedOut>
                      <SignInButton />
                      {/* <SignUpButton /> */}
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                </header>
            </SidebarFooter>
        </Sidebar>
    )
}
