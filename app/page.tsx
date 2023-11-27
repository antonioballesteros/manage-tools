import Link from "next/link";

export default function Home() {
  return (
    <ul className="list-disc">
      <li>
        <Link href="/tool/4aa3261c-179f-471c-8a2e-ee2bc17af5ad">
          Example with 2 items and 1 rows
        </Link>
      </li>
      <li>
        <Link href="/tool/c7e22cb6-43f9-4a88-ba5d-14c9bd04bb6c">
          Example with 5 items and 3 rows
        </Link>
      </li>
      <li>
        <Link href="/tool/a1526006-2754-44d2-a2ca-ccaa622cff2b">
          Example with 15 items and 8 rows
        </Link>
      </li>
      <li>
        <Link href="/tool/7d2c362f-da80-4ff7-a2f5-e476715f8b45">
          Example with 1 items and 1 row and 1 incorrect empty row
        </Link>
      </li>
    </ul>
  );
}
