import { useEffect } from 'react';
import { Event } from '@/types';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';

type CheckoutProps = {
  event: Event;
  userId: string;
};

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Checkout({ event, userId }: CheckoutProps) {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  async function handleCheckout() {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price || '100',
      isFree: event.isFree,
      buyerId: userId
    };

    await checkoutOrder(order);
  }

  return (
    <form onSubmit={handleCheckout}>
      <Button className="button sm:w-fit" type="submit" role="link" size="lg">
        {event.isFree ? 'Get Tickets!' : `Buy Tickets!`}
      </Button>
    </form>
  );
}

export default Checkout;
