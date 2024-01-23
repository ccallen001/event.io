import { useUserPublicMetadata } from '@/hooks/useUserPublicMetadata';

import EventForm from '@/components/shared/EventForm';

function CreateEvent() {
  const { userId } = useUserPublicMetadata();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-colver bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm {...{ userId, type: 'Create' }} />
      </div>
    </>
  );
}

export default CreateEvent;
