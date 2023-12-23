import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="flex-center flex-col sm:flex-row gap-4 p-5 wrapper">
        <Link href="/">event.io</Link>

        <small>2023 All rights reserved</small>
      </div>
    </footer>
  );
}
