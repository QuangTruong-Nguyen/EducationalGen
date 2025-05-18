'use client'
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


export function AppSidebar() {
    const router = useRouter()
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
                        <UploadDrawer>
                            <Plus /> 
                        </UploadDrawer>
                        <span className="sr-only">Add new chat</span>
                    </SidebarGroupAction>
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
                
            </SidebarFooter>
        </Sidebar>
    )
}
