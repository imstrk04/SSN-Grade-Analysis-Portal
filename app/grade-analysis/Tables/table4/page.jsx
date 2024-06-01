"use client";
import React, { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import { fetchData } from "@/app/grade-analysis/databaseUtils";
import Navbar from "@/app/grade-analysis/Navbar";
import Table4 from "../table4";
import Home from "@/components/navbar/page";

const Table3Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    const fetchedData = await fetchData(year, semester, section);
    setData(fetchedData);
    setLoading(false);
  };

  return (
    <><Navbar
      setYear={setYear}
      setSemester={setSemester}
      setSection={setSection}
      handleSubmit={handleSubmit} />
      <div className='flex'>
                <Home />
          {loading ? (
            <p>Rendering...</p>
          ) : data.length > 0 ? (
            <Table4 data={data} />
          ) : (
            <p>
              No data available. Please select the proper parameters and submit to fetch
              data.
            </p>
          )}
          </div>
</>
  );
};

export default Table3Page;
