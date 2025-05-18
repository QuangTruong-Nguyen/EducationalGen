'use client'
import Presentation from "@/ui/Presentation"
import  Link  from "next/link"
import '@/app/globals.css'
import ChatComponent from "@/ui/ChatComponent";
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface Image {
    src: string;
    alt: string;
}

let images: Image[] = [
    {
        src: '/thumbnail/0.png',
        alt: 'Presentation 1'
    },
    {
        src: '/thumbnail/1.png',
        alt: 'Presentation 2'
    },
    {
        src: '/thumbnail/2.png',
        alt: 'Presentation 3'
    },
    {
        src: '/thumbnail/3.png',
        alt: 'Presentation 4'
    },
    {
        src: '/thumbnail/4.png',
        alt: 'Presentation 5'
    },
    {
        src: '/thumbnail/5.png',
        alt: 'Presentation 6'
    },
    {
        src: '/thumbnail/6.png',
        alt: 'Presentation 7'
    },
    {
        src: '/thumbnail/7.png',
        alt: 'Presentation 8'
    },
    {
        src: '/thumbnail/8.png',
        alt: 'Presentation 9'
    },
    {
        src: '/thumbnail/9.png',
        alt: 'Presentation 10'
    },
    {
        src: '/thumbnail/10.png',
        alt: 'Presentation 11'
    },
    {
        src: '/thumbnail/11.png',
        alt: 'Presentation 12'
    },
    {
        src: '/thumbnail/12.png',
        alt: 'Presentation 13'
    },
    {
        src: '/thumbnail/13.png',
        alt: 'Presentation 14'
    },
    {
        src: '/thumbnail/14.png',
        alt: 'Presentation 15'
    },
    {
        src: '/thumbnail/15.png',
        alt: 'Presentation 16'
    },
    {
        src: '/thumbnail/16.png',
        alt: 'Presentation 17'
    },
]

export default function Chat() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
            }}
        >
            <AppSidebar/>
            <SidebarInset>
                <header className="bg-blue-950 flex h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Results
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Presentation</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <Presentation images={images} />
                
            </SidebarInset>                
        </SidebarProvider>
    );   
}