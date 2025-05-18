import Image from "next/image";
import { GraduationCap } from "lucide-react";
import SubjectCard from "@/ui/SubjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Home() {
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex sticky top-0 items-center gap-2 p-3 bg-slate-200">
        <div className="size-24 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 rounded-full w-12 h-12 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <span className="text-lg font-semibold">Educational Multiagent System</span>
      </div>
      
      <div className="flex items-center justify-center pt-10">
        <h1 className="text-5xl font-bold font-sans">Welcome to Educational Multiagent System</h1>
      </div>

      <div className="pt-10 grid mx-auto w-250 items-end justify-end">
        <Button className="w-25 h-10 rounded-full">
          <Plus className="w-4 h-4" />
          <span>Tạo mới</span>
        </Button>
      </div>

      <div className="mx-auto w-250 pt-20 grid grid-cols-3 gap-4 justify-center items-center">
        <SubjectCard title="Introduction to AI" description="Math is a subject that deals with numbers and shapes." />
        <SubjectCard title="Introduction to AI" description="Math is a subject that deals with numbers and shapes." />
        <SubjectCard title="Introduction to AI" description="Math is a subject that deals with numbers and shapes." />
        <SubjectCard title="Introduction to AI" description="Math is a subject that deals with numbers and shapes." />
        <SubjectCard title="Introduction to AI" description="Math is a subject that deals with numbers and shapes." />
      </div>
    </div>
  );
}
