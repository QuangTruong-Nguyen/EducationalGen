import '@/app/globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {AppSidebar} from '@/components/app-sidebar'
import { GraduationCap } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gradient-to-br from-blue-300 to-emerald-200 w-full h-full">

            <div className="flex object-top-left">
                <SidebarProvider
                    style={{
                        "--sidebar-width": "20rem",
                        "--sidebar-width-mobile": "20rem",
                    }}
                >
                    
                    <AppSidebar />
                    <main>
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
  }