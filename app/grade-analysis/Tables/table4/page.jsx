"use client";
import React, { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import {
  fetchData,
  fetchRollNumbers,
} from "@/app/grade-analysis/databaseUtils";
import Navbar from "@/app/grade-analysis/Navbar";
import Table4 from "../table4";
import Home from "@/components/navbar/page";
import Spinner2 from "@/components/ui/spin2";

const Table3Page = () => {
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

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true immediately
    setTimeout(async () => {
      const fetchedData = await fetchData(
        year,
        semester,
        rollNumberStart,
        rollNumberEnd
      );
      setData(fetchedData);
      setLoading(false); // Set loading to false after fetching and setting data
    }, 2000); // Set timeout for 2 seconds
  };

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
        {loading ? (
          <Spinner2 />
        ) : data.length > 0 ? (
          <div style={{ marginLeft: "500px", marginTop: "40px" }}>
            <Table4 data={data} />
          </div>
        ) : (
          <p className="no-data">
            No data available. Please select the proper parameters and submit to
            fetch data.
          </p>
        )}
      </div>
    </>
  );
};

export default Table3Page;