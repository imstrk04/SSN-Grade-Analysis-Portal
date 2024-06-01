'use client'
import React, { useEffect } from 'react';
import { SelectDemo } from '../components/navbar/select';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/firebase.js';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, } from "framer-motion";
import { useRef } from "react";
const IndexPage: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // Ensure session storage is available before accessing it
    if (typeof window !== 'undefined') {
      const userSession = sessionStorage.getItem('user');
      if (!user && !userSession) {
        router.push('/sign-in');
      }
    }
  }, [user, router]);
  const scrollRef = useRef(null);
  return (
    <div ref={scrollRef} style={{ overflow: "scroll" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 15 }}
            transition={{ delay: 0.25 }}>
    <div className="flex flex-col h-screen" style={{ backgroundImage: `url(image/ssnbg.jpeg)` }}>
      <div className="flex flex-grow">
        <div className="flex-grow p-4 relative">
          <div className="text-gray-800">
            <div className="mb-8">
              <SelectDemo />
              <Button
                onClick={() => {
                  signOut(auth);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('user');
                  }
                }}
                className="absolute top-0 right-0 mt-2 mr-2"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
    </AnimatePresence>
    </div>
  );
}

export default IndexPage;
