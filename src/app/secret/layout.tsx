import '@/app/globals.css'
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-slate-950 w-full h-full">

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
              <Toaster className='dark' />
          </div>
      </div>
  );
}