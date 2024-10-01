import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[89vh] gap-5 font-serif">
      <div className="text-5xl">Play With: </div>
      <ol className="flex flex-col gap-3">
        <li className="hover:scale-105 text-2xl rounded-lg bg-green-500 p-3 flex justify-center items-center"><Link href="/PassnPlay">PassnPlay</Link></li>
        <li className="hover:scale-105 text-2xl rounded-lg bg-green-500 p-3 flex justify-center items-center"><Link href="/computer">Computer</Link></li>
        <li className="hover:scale-105 text-2xl rounded-lg bg-green-500 p-3 flex justify-center items-center"><Link href={"/online"}>Online</Link></li>
        <li className="hover:scale-105 text-2xl rounded-lg bg-green-500 p-3 flex justify-center items-center"><Link href={"/friend"}>Friend</Link></li>
      </ol>
    </div>
  )
}