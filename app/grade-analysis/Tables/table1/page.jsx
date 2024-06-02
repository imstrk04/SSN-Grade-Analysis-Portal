'use client'
import React, { useState, useEffect } from "react";
import Navbar from "@/app/grade-analysis/Navbar";
import Table1 from "@/app/grade-analysis/Tables/table1";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import {
  fetchData,
  fetchRollNumbers,
} from "@/app/grade-analysis/databaseUtils";
import Home from "@/components/navbar/page";
import Spinner2 from "@/components/ui/spin2";

const Table1Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [rollNumberStart, setRollNumberStart] = useState("");
  const [rollNumberEnd, setRollNumberEnd] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const handleSubmit = async () => {
    setLoading(true);
    const fetchedData = await fetchData(
      year,
      semester,
      rollNumberStart,
      rollNumberEnd
    );
    setData(fetchedData);
    setTimeout(() => {
      setLoading(false); // Set loading to false after 5 seconds
    }, 2500);
  };

  useEffect(() => {
    const fetchDefaultRollNumbers = async () => {
      const rollNumbers = await fetchRollNumbers(year);
      console.log(rollNumbers);
      if (rollNumbers.length > 0) {
        setRollNumberStart(Math.min(...rollNumbers).toString());
        setRollNumberEnd(Math.max(...rollNumbers).toString());
      }
    };

    if (year) {
      fetchDefaultRollNumbers();
    }
  }, [year]);

  if (!user) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        .loading {
          font-size: 1.2em;
          color: #555;
          text-align: center;
          margin: 20px 0;
        }

        .no-data {
          font-size: 1.2em;
          color: #999;
          text-align: center;
          margin: 20px 0;
        }
      `}</style>
      <Navbar
        setYear={setYear}
        setSemester={setSemester}
        setRollNumberStart={setRollNumberStart}
        setRollNumberEnd={setRollNumberEnd}
        handleSubmit={handleSubmit}
        rollNumberStart={rollNumberStart}
        rollNumberEnd={rollNumberEnd}
      />
     


      <div className="flex">
        <Home />
        <div>
          
          {loading ? (
            <Spinner2 />
          ) : data.length > 0 ? (
            <Table1 data={data} />
          ) : (
            <p className="no-data">
              No data available. Please select the parameters and submit to
              fetch data.
            </p>
          )}
        </div>
      </div>
      
    </>
  );
};

export default Table1Page;
