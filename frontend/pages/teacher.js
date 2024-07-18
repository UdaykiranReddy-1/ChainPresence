import dynamic from 'next/dynamic';

const TeacherData = dynamic(
  () => import('./components/teacher'),
  { ssr: false }  
);

export default function Page() {
  return <TeacherData />;
}