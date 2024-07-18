import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

// Import your contract ABI
import contractABI from "../../artifacts/contracts/student.sol/StudentAttendance.json";
const contractAddress = '0x08C7E979fa72A6d76DFd8Ca077BD7d33B352AC53';

const Home = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
console.log("isConnected", isConnected);
console.log("address", address);
  useEffect(() => {
    if (isConnected && address) {
      console.log("address-sending", address);
      checkRoleAndRedirect(address);
    }
  }, [isConnected, address]);

  const checkRoleAndRedirect = async (userAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

    try {
      const teacherAddress = await contract.teacher();
      console.log("teacherAddress", teacherAddress); 
      if (userAddress.toLowerCase() === teacherAddress.toLowerCase()) {
        router.push('/teacher');
        return;
      }

      // Check if the connected address is a student
      const isStudent = await contract.students(userAddress);
      if (isStudent) {
        router.push('/student');
        return;
      }

      // If not teacher or student, redirect to error page
      router.push('/');
    } catch (error) {
      console.error("Error checking roles:", error);
      router.push('/');
    }
  };

  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <ConnectKitButton />
    </div>
  );
};

export default Home;