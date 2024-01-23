import { useUserPublicMetadata } from '@/hooks/useUserPublicMetadata';

import { getEventById } from '@/lib/actions/event.actions';

import EventForm from '@/components/shared/EventForm';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

async function UpdateEvent({ params: { id } }: UpdateEventProps) {
  const { userId } = useUserPublicMetadata();

  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-colver bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      {!event ? (
        <div className="m-auto mt-16 w-16 h-16 border-8 border-dotted rounded-full border-primary-500 animate-spin"></div>
      ) : (
        <div className={`wrapper my-8 ${!event ? 'animate-pulse' : ''}`}>
          <EventForm {...{ userId, event, type: 'Update' }} />
        </div>
      )}
    </>
  );
}

export default UpdateEvent;
