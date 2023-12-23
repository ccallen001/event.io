import { Sheet } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { SheetTrigger, SheetContent } from '../ui/sheet';
import Image from 'next/image';
import NavItems from './NavItems';

export default function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            className="cursor-pointer"
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          event.io
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
