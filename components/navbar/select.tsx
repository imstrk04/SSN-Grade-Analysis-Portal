import * as React from "react";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import CardMenu from "@/components/ui/page";


export function ButtonDemo() {
    return <Button>Submit</Button>;
}

export function SelectDemo() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/dashboard');
    };
    const handleContinue = () => {
        router.push('/add-result');
    };
    const handleContinue1 = () => {
        router.push('/add-batch');
    };
    const words = [
        {
            text: "Student",
        },
        {
            text: "Grade ",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "Analysis",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "Portal",
        },
    ];

    return (

        <>
            <div className="relative h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-white inline-block">
                        <TypewriterEffect words={words} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-8">
                    <CardMenu />
                </div>

                <div className="fixed bottom-0 right-0 mb-4 mr-4 flex">

                    <div style={{ marginRight: '10px' }}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='max-w-[150px] flex items-center'>
                                    <Pencil className='mr-2 h-4 w-4 md:h-6 md:w-6' />Add Students
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Do you want to Add New Batch?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleContinue1}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <div style={{ marginLeft: '10px' }}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='max-w-[150px] flex items-center'>
                                    <Pencil className='mr-2 h-4 w-4 md:h-6 md:w-6' />Add Results
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Do you want to Add New Semester Results?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>

                                <Button >
                                    <MdDeleteOutline className='text-3xl -ml-4' />
                                    Delete Records
                                </Button>

                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Do you want to Add New Semester Results?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div></>
    );
}
