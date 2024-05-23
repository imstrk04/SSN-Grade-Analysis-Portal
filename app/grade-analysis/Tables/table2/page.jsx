'use client'
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/app/grade-analysis/Navbar";
import Table2 from "@/app/grade-analysis/Tables/table2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import { fetchData } from "@/app/grade-analysis/databaseUtils";
import Home from "@/components/navbar/page";
import { Bar, Chart } from 'react-chartjs-2';

const Table1Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);

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
    renderChart(fetchedData);
  };

  const renderChart = (fetchedData) => {
    const chartLabels = [
      "9.0 GPA",
      "8.5 GPA",
      "8.0 GPA",
      "7.5 GPA",
      "7.0 GPA",
      "6.5 GPA",
      "6.0 GPA",
      "5.5 GPA",
      "5.0 GPA",
    ];

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: "No. of Candidates",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: chartLabels.map((label) => {
            const filteredCandidates = fetchedData.filter(
              (candidate) => candidate.gpa > parseFloat(label)
            );
            return filteredCandidates.length;
          }),
        },
      ],
    };

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render new chart
    chartRef.current = new Chart(document.getElementById("myChart"), {
      type: "bar",
      data: chartData,
      options: {
        // Add your options here
      },
    });
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
        setSection={setSection}
        handleSubmit={handleSubmit}
      />
      <div className="flex">
        <Home />
        <div>
          <h1>Table 1</h1>
          {loading ? (
            <p className="loading">Rendering...</p>
          ) : data.length > 0 ? (
            <>
              <Table2 data={data} />
              {/* Render chart */}
              <div style={{ marginTop: "20px" }}>
                <canvas id="myChart" />
              </div>
            </>
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
