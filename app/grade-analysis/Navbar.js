import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDatabase, ref, get, child, onValue } from 'firebase/database';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Navbar = ({ setYear, setSemester, setSection, handleSubmit }) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const batchesRef = ref(database, "student details");
    onValue(batchesRef, (snapshot) => {
      const data = snapshot.val();
      const batchSet = new Set();
      for (let id in data) {
        batchSet.add(data[id].Batch);
      }
      setBatches([...batchSet]);
    });
  }, []);

  return (
    <nav className="bg-blue-500 p-6 shadow-md w-full flex justify-between items-center">
      <div style={{ marginTop: "5px" }}>
        <Link href="/">
          <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <div className="max-w-7xl mx-auto flex items-center w-full px-2 lg:px-8">
        <h1 className="flex-shrink-0 mr-auto"></h1>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setYear}>
            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setSemester}>
            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Semester 1">Semester 1</SelectItem>
                <SelectItem value="Semester 2">Semester 2</SelectItem>
                <SelectItem value="Semester 3">Semester 3</SelectItem>
                <SelectItem value="Semester 4">Semester 4</SelectItem>
                <SelectItem value="Semester 5">Semester 5</SelectItem>
                <SelectItem value="Semester 6">Semester 6</SelectItem>
                <SelectItem value="Semester 7">Semester 7</SelectItem>
                <SelectItem value="Semester 8">Semester 8</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setSection}>
            <SelectTrigger className="w-40 md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
                <SelectItem value="ALL">Overall</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#1800f0",
              borderColor: "#1800f0",
            }}
            className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
          >
            Submit
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
