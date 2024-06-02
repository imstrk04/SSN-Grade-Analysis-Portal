'use client'
import Head from 'next/head'
import { MenuIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
} from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
    const [active, setActive] = useState(false)
    const router = useRouter();
    function toggleSidebar() {
        setActive(!active)
    }
    const handleClick = () => {
        router.push('/dashboard');
    };
    const handleContinue = () => {
        router.push('/grade-analysis');
    };
    
    const handleClick2 = () => {
        router.push('/nba');
    };
    const handleClick3 = () => {
        router.push('/nba');
    };

    return (
        <div className="flex min-h-screen text-text-color">
            <Head>
                <title>Sidebar</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <aside className={`
        transition-all duration-300
    flex flex-col items-center justify-between bg-white
    ${active ? 'w-64' : 'w-20'}
    ${active ? 'lg:w-50' : 'lg:w-20'}
      `}>
                <div className="p-4 w-full space-y-6">
                    <div className="flex items-center justify-between">
                    <Link href="/">
    <img
      className={`
        ${active ? 'block' : 'hidden'}
      `}
      src="/assets/logo.svg"
    />
</Link>
                        <button className="p-3 rounded-xl hover:bg-light-green" onClick={toggleSidebar}>
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <button className="flex w-full p-3 rounded-xl hover:bg-light-green"
                            onClick={handleClick}>
                            <MdOutlineSpaceDashboard
                                className="h-6 w-6" />
                            <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>Student GradeBook</span>
                        </button>


                        <button className="flex w-full p-3 rounded-xl hover:bg-light-green"onClick={handleContinue}>
                            <MdOutlineAnalytics className="h-6 w-6"  />
                            <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>Grade Analysis</span>
                        </button>

                        <button className="flex w-full p-3 rounded-xl hover:bg-light-green" onClick={handleClick2}>
                            <img className="h-6 w-6" src="/assets/user.svg" />
                            <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>BatchWise Analysis</span>
                        </button>

                        
                    </div>
                </div>
            </aside>
            
        </div>
    )
}
