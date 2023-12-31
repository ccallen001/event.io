import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs';

import { IUserPublicMetadata } from '@/lib/database/models/user.model';

function CreateEvent() {
  const { sessionClaims } = auth();
  const userPublicMetadata =
    sessionClaims?.userPublicMetadata as IUserPublicMetadata;
  const { userId } = userPublicMetadata || null;

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
