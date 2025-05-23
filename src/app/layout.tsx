import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GraduationCap } from "lucide-react";


export const metadata: Metadata = {
  title: 'EducationalGen-Multi-Agent',
  description: 'EducationalGen-Multi-Agent',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className="min-h-screen bg-slate-50">
    //     {children}
    //   </body>
    // </html>


    <ClerkProvider>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* <div className="flex sticky top-0 items-center justify-between p-3 bg-slate-200">
                <div className="flex items-center gap-2">
                  <div className="size-24 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 rounded-full w-12 h-12 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-lg font-semibold">Educational Multiagent System</span>
                </div>
                <header className="flex items-center gap-4">
                    <SignedOut>
                      <SignInButton />
                      <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                </header>
              </div> */}
              {children}
            </body>
          </html>
    </ClerkProvider>
  );
}
