import Head from 'next/head'
import { MenuIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { MdOutlineSpaceDashboard, MdOutlineAnalytics } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import Image from 'next/image'; // Import Image component from next/image

export default function Home() {
  const [active, setActive] = useState(false)

  function toggleSidebar() {
    setActive(!active)
  }

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
      `}>
        <div className="p-4 w-full space-y-6">
          <div className="flex items-center justify-between">
            <Image
              className={`
                ${active ? 'block' : 'hidden'}
              `}
              src="/assets/logo.svg"
              alt="Logo" // Add alt text for the logo image
              width={64} // Adjust width and height based on your design
              height={64}
            />
            <button className="p-3 rounded-xl hover:bg-light-green" onClick={toggleSidebar}>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-3">
            <button className="flex w-full p-3 rounded-xl hover:bg-light-green">
              <MdOutlineSpaceDashboard
                className="h-6 w-6" />
              <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>Dashboard</span>
            </button>

            <button className="flex w-full p-3 rounded-xl hover:bg-light-green">
              <MdOutlineAnalytics className="h-6 w-6" />
              <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>Grade Analysis</span>
            </button>

            <button className="flex w-full p-3 rounded-xl hover:bg-light-green">
              <Image
                className="h-6 w-6"
                src="/assets/user.svg"
                alt="User Icon" // Add alt text for the user icon image
                width={24} // Adjust width and height based on your design
                height={24}
              />
              <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>NBA Records</span>
            </button>

            <button className="flex w-full p-3 rounded-xl hover:bg-light-green">
              <AiOutlineStop className="h-6 w-6" />
              <span className={`
                ml-3
                ${active ? 'block' : 'hidden'}
              `}>BackLogs</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="flex flex-grow p-7 bg-body-bg-color">
        <h2 className="font-semibold">Dashboard</h2>
      </main>
    </div>
  )
}
