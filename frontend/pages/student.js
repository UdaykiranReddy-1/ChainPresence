import dynamic from 'next/dynamic';

const StudentData = dynamic(
  () => import('./components/student'),
  { ssr: false }  
);

export default function Page() {
  return <StudentData />;
}