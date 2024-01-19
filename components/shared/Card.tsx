import { Event } from '@/types';
import Link from 'next/link';

type CardProps = {
  event: Event;
  hasOrderLink?: boolean;
  isPriceHidden?: boolean;
};

function Card({ event, hasOrderLink, isPriceHidden }: CardProps) {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link href={`/events/${event._id}`}></Link>
    </div>
  );
}

export default Card;
