import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ethers } from 'ethers';
import Navbar from './Navbar';
import contractABI from "../../../artifacts/contracts/student.sol/StudentAttendance.json"

const contractAddress = '0x08C7E979fa72A6d76DFd8Ca077BD7d33B352AC53';

const TeacherPage = () => {
  // const { data: signer } = useSigner();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [studentAddress, setStudentAddress] = useState('');
  const [attendance, setAttendance] = useState(null);
  

  const checkAttendance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    const dateAsTimestamp = Math.floor(selectedDate.getTime() / 1000);
    const formattedDate = Math.floor(dateAsTimestamp / 86400);
    console.log(dateAsTimestamp, formattedDate)

    try {
      console.log("studentAddress", studentAddress);
      const result = await contract.checkAttendance(formattedDate, studentAddress);
      setAttendance(result);
      console.log("Attendance checked:", result);
    } catch (error) {
      console.error("Error retrieving attendance:", error);
    }
  };

  return (
    <div className="p-4">
      <Navbar/>
      <h1 className="text-lg font-bold mb-4">Check Student Attendance</h1>
      <p className="mb-4">Select the date and enter the student address to check attendance</p>
      <div className="mb-4">
        <DatePicker className="text-black" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </div>
      <input
        className="border p-2 mr-2 text-black"
        type="text"
        placeholder="Enter Student Address"
        value={studentAddress}
        onChange={(e) => setStudentAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={checkAttendance}>
        Check Attendance
      </button>
      <div>
        {attendance !== null && (
          <p>{attendance ? "Present" : "Absent"}</p>
        )}
      </div>
    </div>
  );
};

export default TeacherPage;