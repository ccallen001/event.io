import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="flex w-full h-lvh">
      <div className="m-auto text-center">
        <h1>404 | Page not found</h1>
        <Link href="/" className="m-auto text-primary-500 font-bold">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
