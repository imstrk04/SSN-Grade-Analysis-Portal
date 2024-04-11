'use client'

import React, { useEffect } from 'react';
import { SelectDemo } from './navbar/select';


const IndexPage: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">

      <div className="flex flex-grow">
        <div className="w-1/4 border-l-8 border-blue-500 bg-blue-500 p-4 transition-all duration-300 transform hover:scale-105">
        </div>
        <div className="flex-grow p-4">
          <div className="text-gray-800">
            <div className="mb-8">
              <SelectDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
