import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

export function ButtonDemo() {
    return <Button>Submit</Button>;
}

export function SelectDemo() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/dashboard');
    };
    const handleContinue = () => {
        router.push('/add-results');
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
        <div className="relative h-screen">
            <div className="flex flex-col items-center justify-center">
                <TypewriterEffect words={words} />
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-4 md:space-y-0 md:space-x-8">
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md shadow-md mt-1">
                        <SelectGroup>
                            <SelectLabel>Academic Year</SelectLabel>
                            <SelectItem value="2022-2023">2022-2026</SelectItem>
                            <SelectItem value="2023-2024">2023-2027</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md shadow-md mt-1">
                        <SelectGroup>
                            <SelectLabel>Semester</SelectLabel>
                            <SelectItem value="Semester 1">Semester 1</SelectItem>
                            <SelectItem value="Semester 2">Semester 2</SelectItem>
                            <SelectItem value="Semester 3">Semester 3</SelectItem>
                            <SelectItem value="Semester 4">Semester 4</SelectItem>
                            <SelectItem value="Semester 5">Semester 5</SelectItem>
                            <SelectItem value="Semester 6">Semester 6</SelectItem>
                            <SelectItem value="Semester 7">Semester 7</SelectItem>
                            <SelectItem value="Semester 8">Semester 8</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button onClick={handleSubmit}>Submit</Button>
            </div>

            <div className="fixed bottom-0 right-0 mb-4 mr-4 flex">
                <Button className='max-w-[150px] mr-4'>
                    <Pencil className="mr-2 h-4 w-4 md:h-6 md:w-6" />Add Semester
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='max-w-[150px] flex items-center'>
                            <Pencil className='mr-2 h-4 w-4 md:h-6 md:w-6' />Add Batch
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Do you want to Add New Batch Semester Results?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
