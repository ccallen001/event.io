import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Collection from '@/components/shared/Collection';

import { getAllEvents } from '@/lib/actions/event.actions';

export default async function Home() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6
  });

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0 wrapper">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host your events here!</h1>
            <p className="p-regular-20 md:p-regular-24">
              The all in one platform for creating, hosting, and discovering
              events.
            </p>
            <Button className="button w-full sm:w-fit" size="lg" asChild>
              <Link href="#events">Explore</Link>
            </Button>
          </div>

          <Image
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          />
        </div>
      </section>

      <section
        id="event"
        className="wrapper margin-y-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by
          <br />
          Thousands of Events
        </h2>

        <div className="flex flex-col md:flex-row gap-5 w-full">
          Search
          <br />
          Category
        </div>

        <Collection
          data={events?.data || []}
          emptyTitle="No Events Found"
          emptyStatusSubtext="Come back later..."
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
