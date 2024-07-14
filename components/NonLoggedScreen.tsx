import Link from "next/link";

export default function NonLogged() {
  return (
    <>
      <div className="heading text-2xl">
        You missing the real Fun SignIn to see the magic
      </div>
      <Link
        className="border border-white px-4 py-2 text-2xl rounded-md hover:bg-primary"
        href="/api/auth/signin"
      >
        SignIn
      </Link>
    </>
  );
}
