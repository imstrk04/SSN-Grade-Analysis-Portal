'use client'
import React, { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Home from '../../components/navbar/page';
import Table1 from './Tables/table1';
import Table2 from './Tables/table2';
import Table3 from './Tables/table3';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/config';
import { useRouter } from 'next/navigation';

const Grade: React.FC = () => {
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
                        <Select>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="2022-2023">2022-2026</SelectItem>
                                    <SelectItem value="2023-2024">2023-2027</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
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
                        <Select>
                            <SelectTrigger className="w-40 md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button style={{ backgroundColor: '#1800f0', borderColor: '#1800f0' }} className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out">
                            Submit
                        </Button>
                    </div>
                </div>
            </nav>
            <div className='flex'>
                <Home />
                <div>
                    <div>
                        <h1>Table 1</h1>
                        <Table1 />
                    </div>
                    <div>
                        <h1>Table 2</h1>
                        <Table2 />
                        <div className="mb-4 mt-8">
                            <h1>Table 4</h1>
                            <Table3 />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Grade;


