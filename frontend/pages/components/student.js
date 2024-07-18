import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';
import { ethers } from 'ethers';
import Navbar from './Navbar';
import contractABI from "../../../artifacts/contracts/student.sol/StudentAttendance.json";

const contractAddress = '0x08C7E979fa72A6d76DFd8Ca077BD7d33B352AC53';

const StudentPage = () => {
  const [scannedAddress, setScannedAddress] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setScannedAddress(data);
      console.log("data:", data)
      console.log("Scanned address:", data.text)
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        const dateAsTimestamp = Math.floor(Date.now() / 1000);
        const formattedDate = Math.floor(dateAsTimestamp / 86400);

        const result = await contract.markAttendance();
        setAttendanceStatus(result);
        console.log("Attendance marked:", result);
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error("QR Code scan error:", error);
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-lg font-bold mb-4">Scan QR Code to Mark Attendance</h1>
      <div className="mx-80 ">
        <QrReader
          delay={300}
          onError={handleError}
          onResult={handleScan}
          style={{ width: '50%', height : '50%' }}
        />
      </div>
      <div>
        {attendanceStatus !== null && (
          <p>{attendanceStatus ? "Attendance Marked" : "Failed to Mark Attendance"}</p>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
