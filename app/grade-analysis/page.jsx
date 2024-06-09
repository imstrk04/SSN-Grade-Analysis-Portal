"use client";

import React, { useEffect } from "react";
import Home from "../../components/navbar/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const Grade = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }
  const words = [

    {
      text: "Grade ",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Analysis",
      className: "text-black-500 dark:text-black-500",
    },

  ];
  const navigateTo = (page) => {
    router.push(`/grade-analysis/Tables/${page}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        
          <TypewriterEffect words={words} />
        
      </div>
      <div className="flex">
        <Home />
        <div className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="flex justify-center">
                {" "}
                {/* Add flex class for centering */}
                <Image
                  src="/image/table1.png" // Replace "/image/table1.png" with the URL or path of your image
                  alt="Your image alt text" // Provide alternative text for accessibility
                  className="relative -mt-6 rounded-xl shadow-lg shadow-blue-gray-500/40"
                  width={200} // Set the width of the image
                  height={20} // Set the height of the image
                  layout="fixed" // Maintain the width and height specified
                  objectFit="cover" // Maintain aspect ratio and cover the entire container
                />
              </div>

              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Course Performance Overview
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Pass Percentage, Avg.GPA of Courses in Each Semester
                </p>
              </div>
              <div className="mt-auto p-6 pt-0">
                <button
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => navigateTo("table1")}
                >
                  Click Here
                </button>
              </div>
            </div>
            {/* Repeat the same structure for other cards */}
            {/* Card 2 */}
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="flex justify-center">
                {" "}
                {/* Add flex class for centering */}
                <Image
                  src="/image/table2.png" // Replace "/image/table1.png" with the URL or path of your image
                  alt="Your image alt text" // Provide alternative text for accessibility
                  className="relative -mt-6 rounded-xl shadow-lg shadow-blue-gray-500/40"
                  width={200} // Set the width of the image
                  height={20} // Set the height of the image
                  layout="fixed" // Maintain the width and height specified
                  objectFit="cover" // Maintain aspect ratio and cover the entire container
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  GPA Range
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Number Of Students In Each GPA Range
                </p>
              </div>
              <div className="mt-auto p-6 pt-0">
                <button
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => navigateTo("table2")}
                >
                  Click Here
                </button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="flex justify-center">
                {" "}
                {/* Add flex class for centering */}
                <Image
                  src="/image/table3.png" // Replace "/image/table1.png" with the URL or path of your image
                  alt="Your image alt text" // Provide alternative text for accessibility
                  className="relative -mt-6 rounded-xl shadow-lg shadow-blue-gray-500/40"
                  width={200} // Set the width of the image
                  height={20} // Set the height of the image
                  layout="fixed" // Maintain the width and height specified
                  objectFit="cover" // Maintain aspect ratio and cover the entire container
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Grade Distribution
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Grade Distribution For Each Course
                </p>
              </div>
              <div className="mt-auto p-6 pt-0">
                <button
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => navigateTo("table3")}
                >
                  Click here
                </button>
              </div>
            </div>
            {/* Card 4 */}
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="flex justify-center">
                {" "}
                {/* Add flex class for centering */}
                <Image
                  src="/image/table4.png" // Replace "/image/table1.png" with the URL or path of your image
                  alt="Your image alt text" // Provide alternative text for accessibility
                  className="relative -mt-6 rounded-xl shadow-lg shadow-blue-gray-500/40"
                  width={200} // Set the width of the image
                  height={20} // Set the height of the image
                  layout="fixed" // Maintain the width and height specified
                  objectFit="cover" // Maintain aspect ratio and cover the entire container
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Arrear Count
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  Student Distribution by arrear count
                </p>
              </div>
              <div className="mt-auto p-6 pt-0">
                <button
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => navigateTo("table4")}
                >
                  Click Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grade;