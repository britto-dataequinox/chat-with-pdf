"use client";

import createCheckoutSession from "@/api/createCheckoutSession";
import { Button } from "@/components/ui/button";
import getStripe from "@/lib/stripe-js";
import userSubscription from "@/utils/hooks/userSubscription";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type UserDetails = {
  email: string;
  name: string;
};

const Price = () => {
  const { user } = useUser();
  const router = useRouter();
  const { hasActiveMembership, loading } = userSubscription();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString(),
      name: user.fullName,
    };

    startTransition(async () => {
      const stripe = await getStripe();

      if (hasActiveMembership) {
      }

      const sessionId = await createCheckoutSession(userDetails);

      await stripe?.redirectToCheckout({
        sessionId,
      });
    });
  };

  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Charge your document companion
          </p>
        </div>
        <p className="mx-auto mt-5 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that best for you to interact with your
          PDF'S.
        </p>
        <div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
          <div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Explore core features at no cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                Free
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Documents
              </li>
              <li className="flex gap-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Up to 3 messages per document
              </li>
              <li className="flex gap-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Try out the AI chat
              </li>
            </ul>
          </div>
          <div className="ring-2 ring-red-600 rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-red-600">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Maximize use of our tools to increase your knowledge and
              productivity
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                ₹499
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                / month
              </span>
            </p>
            <Button
              onClick={handleUpgrade}
              disabled={loading || isPending}
              className="bg-red-600 w-full text-white shadow-sm hover:bg-red-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {isPending || loading
                ? "Loading..."
                : hasActiveMembership
                  ? "Manage Plan"
                  : "Upgrade to pro"}
            </Button>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Store upto 20 documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Ability to delete documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Up to 100 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Your chatbot is here to help you
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-red-600" />
                24-hour support response time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
