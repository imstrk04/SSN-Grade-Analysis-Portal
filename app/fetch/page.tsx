import { get, ref, Database } from "firebase/database";
import { useEffect, useState } from "react";
import db from '@/components/firebase/firebase';

interface User {
    id: string;
    name: string; // Assuming name is a property of your user object
    // Add other properties as needed
}

export default function YourComponent() {
    const [users, setUsers] = useState<User[]>([]); // Define the type of users as an array of User interface

    useEffect(() => {
        const usersRef = ref(db as Database, 'users'); // Cast db as Database

        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                        id,
                        ...data,
                    })) as User[]; // Cast to User[]
                    setUsers(usersArray);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
}
