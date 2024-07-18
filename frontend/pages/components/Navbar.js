import { useAccount } from 'wagmi';

const Navbar = () => {
  const { address } = useAccount();

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-between items-center">
        <li>ChainPresence</li>
        <li>{address ? `Connected as: ${address}` : "Not connected"}</li>
      </ul>
    </nav>
  );
};

export default Navbar;