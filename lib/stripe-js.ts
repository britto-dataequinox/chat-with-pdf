import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY == undefined) {
  throw new Error("Key not found");
}

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      throw new Error(
        "Stripe publishable key is not defined in the environment variables.",
      );
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

export default getStripe;
