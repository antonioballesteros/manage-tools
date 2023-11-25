import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/tool/1">Example with 2 items and 1 rows</Link>
      <Link href="/tool/2">Example with 5 items and 3 rows</Link>
      <Link href="/tool/3">Example with 15 items and 8 rows</Link>
    </>
  );
}
