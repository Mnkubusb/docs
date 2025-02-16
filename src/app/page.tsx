import Link from "next/link";

const Home = () => {
  return ( 
    <div className="text-5xl gap-3 font-bold flex flex-col min-h-screen items-center justify-center">
      <p> Manik Chand Sahu </p>
      <Link href="/documents/5156456" className="text-2xl underline text-blue-500">Click Here</Link>
    </div>
   );
}
 
export default Home;