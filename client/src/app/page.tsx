import { Navbar } from "@/components/navbar";
import Landing from "./(nondashboard)/landing/page";

export default function Home() {
  return (
    <div className='size-full'>
      <Navbar />
      <main className={`h-full flex w-full flex-col`}>
        <Landing />
      </main>
    </div>
  )
}
