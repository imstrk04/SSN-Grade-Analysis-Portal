'use client'

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import Home from '../../components/navbar/page';
import { Button } from '@/components/ui/button';
import Table1 from './table1';
import Table2 from './table2';

const NewPage: React.FC = () => {
    return (
        <>
            <nav className="bg-blue-500 p-6 shadow-md w-full flex justify-between items-center">
                <div style={{ marginTop: '5px' }}> 
                    <Link href="/">
                        <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto flex items-center w-full px-2 lg:px-8">
                    <h1 className="flex-shrink-0 mr-auto"> 
                    </h1>
                    <div className="flex items-center space-x-4">
                    </div>
                </div>
            </nav>
            <div className='flex'>
                <Home />
                <div style={{ marginLeft: '25vw' }}>
                    <div style={{ margin: '20px 0' }}>
                        <Table1 />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <Table2 />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPage;
