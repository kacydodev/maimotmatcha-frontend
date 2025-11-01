'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(priceId: string) {
	console.log('priceId:', priceId);
	// get auth session

	// create checkout session
	const checkoutSession = await stripe.checkout.sessions.create({
		mode: 'payment',
		// payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
	});

	// Redirect directly from Server Action (no need to return URL!)
	redirect(checkoutSession.url!);
}
