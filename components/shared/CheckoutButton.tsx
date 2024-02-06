'use client';

import { Event } from '@/types';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

type CheckoutButtonProps = {
  event: Event;
};

function CheckoutButton({ event }: CheckoutButtonProps) {
  const isEventFinished = !event
    ? true
    : new Date(event?.endDateTime) < new Date();

  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3">
      {isEventFinished ? (
        <p>Tickets are no longer available for this event.</p>
      ) : (
        <>
          <SignedOut>
            <Button className="button rounded-full" size="lg" asChild>
              <Link href="/sign-in">Get Tickets!</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout {...{ event, userId }} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default CheckoutButton;
