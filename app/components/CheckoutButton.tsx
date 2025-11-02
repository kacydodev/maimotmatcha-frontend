'use client';

import { CartItem } from '@/types';
import { createCheckoutSession } from '../actions/checkout';

export default function CheckoutButton() {
	const items: CartItem[] = [
		{
			priceId: 'price_1SOTdBL9DG9PVRBWzZSFZW9H',
			quantity: 2,
		},
	];

	return (
		<form action={() => createCheckoutSession(items)}>
			<button type='submit' className='bg-slate-300 dark:bg-slate-700 p-3'>
				Checkout
			</button>
		</form>
	);
}
