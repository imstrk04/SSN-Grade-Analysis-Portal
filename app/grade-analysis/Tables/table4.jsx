import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Table4 = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [arrearsStats, setArrearsStats] = useState({});

    useEffect(() => {
        if (data && data.length > 0) {
            console.log("Data received for Table4:", data);
            const stats = calculateArrears(data);
            setArrearsStats(stats);
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table4:", data);
        }
    }, [data]);

    const calculateArrears = (data) => {
        const arrearsCount = {};

        data.forEach(item => {
            const registerNo = item.RegisterNo;
            const grade = item.Grade;

            if (!arrearsCount[registerNo]) {
                arrearsCount[registerNo] = 0;
            }

            if (grade === "RA") {
                arrearsCount[registerNo] += 1;
            }
        });

        const arrearsStats = {};

        Object.values(arrearsCount).forEach(count => {
            if (!arrearsStats[count]) {
                arrearsStats[count] = 0;
            }
            arrearsStats[count] += 1;
        });

        return arrearsStats;
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table className="text-sm border-collapse border border-gray-200 w-full">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-24 py-3 px-4">No. of Arrears</TableHead>
                                <TableHead className="py-3 px-4">No. of Students</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.keys(arrearsStats).map(key => (
                                <TableRow className="bg-white" key={key}>
                                    <TableCell className="font-medium py-3 px-4">{key}</TableCell>
                                    <TableCell className="py-3 px-4">{arrearsStats[key]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default Table4;
