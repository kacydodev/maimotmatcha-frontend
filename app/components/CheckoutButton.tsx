'use client';

import { CartItem } from '@/types';
import { createCheckoutSession } from '@/utils/actions/checkout';
import useCart from '@/utils/hooks/useCart';

export default function CheckoutButton() {
	const {
		cart,
		handlers: { addCartItem },
	} = useCart();

	const testItem: CartItem = {
		priceId: 'price_1SOTdBL9DG9PVRBWzZSFZW9H',
		quantity: 2,
	};

	function handleClick() {
		addCartItem(testItem);
	}

	return (
		<form action={() => createCheckoutSession(cart)}>
			<pre>{JSON.stringify(cart, null, 2)}</pre>
			<button
				type='button'
				onClick={handleClick}
				className='bg-slate-300 dark:bg-slate-700 p-3'
			>
				Add Test Item
			</button>
			<button type='submit' className='bg-slate-300 dark:bg-slate-700 p-3'>
				Checkout
			</button>
		</form>
	);
}
