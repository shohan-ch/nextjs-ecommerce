import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      Welcome page
      <br />
      <Link href={"/counts"}>Count</Link> |<Link href={"/login"}>Login</Link>
    </>
  );
}
