'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signInWithEmailAndPassword, userError] = useSignInWithEmailAndPassword(auth);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSignIn = async (): Promise<void> => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            sessionStorage.setItem('user', 'true'); // Changed 'true' to a string, as sessionStorage only accepts strings
            setEmail('');
            setPassword('');

            // Redirect only if sign-in is successful
            if (res && res.user) {
                router.push('/');
            }
        } catch (e) {
            console.error(e);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                <h1 className="text-white text-2xl mb-5">Sign In</h1>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                />
                <button
                    onClick={handleSignIn}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-light-green"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignIn;
