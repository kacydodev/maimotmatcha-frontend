'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { CartItem } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(items: CartItem[]) {
	const checkoutSession = await stripe.checkout.sessions.create({
		mode: 'payment',

		line_items: items.map((item) => ({
			price: item.priceId,
			quantity: item.quantity,
		})),

		success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
	});

	// Redirect directly from Server Action (no need to return URL!)
	redirect(checkoutSession.url!);
}
