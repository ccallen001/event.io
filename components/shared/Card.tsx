import { formatDateTime } from '@/lib/utils';
import { Event } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useUserPublicMetadata } from '@/hooks/useUserPublicMetadata';
import DeleteConfirmationModal from './DeleteConfirmationModal';

type CardProps = {
  event: Event;
  hasOrderLink?: boolean;
  isPriceHidden?: boolean;
};

function Card({ event, hasOrderLink, isPriceHidden }: CardProps) {
  const { userId } = useUserPublicMetadata();

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      />

      {isEventCreator && !isPriceHidden && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-full">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmationModal eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!isPriceHidden && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 md:p-medium-18 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link className="flex" href={`/events/${event._id}/orders`}>
              <span className="text-primary-500 mr-1">Order Details</span>
              <Image
                src="/assets/icons/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
