import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="w-f border-b">
      <div className="wrapper flex justify-between items-center">
        <Link className="w-36" href="/">
          <strong>event.io</strong>
        </Link>

        <SignedIn>
          <nav className="md:flex-between w-full max-w-xs hidden">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex justify-end gap-3 w-32">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
