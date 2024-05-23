'use client';
import React, { useState, useEffect } from 'react';
import TableDemo from '../../components/table/table';
import Home from '../../components/navbar/page';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [batch, setBatch] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user, router]);

    if (!user) {
        return null; // Or you can return a loading indicator or a message
    }

    const handleSubmit = () => {
        console.log('Batch:', batch);
        console.log('Semester:', semester);
        console.log('Section:', section);
    };

    return (
        <>
            <nav className="bg-blue-500 p-6 shadow-md w-full flex justify-between items-center">
                <div style={{ marginTop: '5px' }}>
                    <Link href="/">
                        <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto flex items-center w-full px-2 lg:px-8">
                    <h1 className="flex-shrink-0 mr-auto"></h1>
                    <div className="flex items-center space-x-4">
                        <Select onValueChange={setBatch}>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Academic Year</SelectLabel>
                                    <SelectItem value="2022-2023">2022-2026</SelectItem>
                                    <SelectItem value="2023-2024">2023-2027</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSemester}>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
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
                        <Select onValueChange={setSection}>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Section</SelectLabel>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSubmit} style={{ backgroundColor: '#1800f0', borderColor: '#1800f0' }} className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out">
                            Submit
                        </Button>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col md:flex-row gap-0">
                <Home />
                {/* Uncomment the following line to display TableDemo */}
                {/* <TableDemo batch={batch} semester={semester} section={section} /> */}
            </div>
        </>
    );
}
