'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"

import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

type Props = {
    title: string;
    description: string;
}

const SubjectCard = ({title, description}: Props) => {
    const router = useRouter();
  return (
    <Card className="w-80 h-48 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
        onClick={() => {
            router.push('/sidebar');
        }}
    >
        <CardContent>
            <div className="grid grid-cols-2">
                <div className="justify-start">
                    <Image src="/images/images.jpg" alt="Artificial Intelligence" width={100} height={100} />
                </div>

                <div className="flex p-5 justify-center items-center">
                    <Label className="text-2xl font-semibold text-slate-600">{title}</Label>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default SubjectCard;
