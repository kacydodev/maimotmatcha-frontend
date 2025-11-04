'use client';

import { CartItem } from '@/types';
import { useMemo, useState } from 'react';
import CartContext from './CartContext';

export default function CartContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cart, setCart] = useState<CartItem[] | []>([
		{ priceId: 'price_1SPaFTL9DG9PVRBWPYjWgBed', quantity: 1 },
	]);

	const handlers = useMemo(
		() => ({
			addCartItem: (newItem: CartItem) => {
				setCart((prev) => {
					const match = prev.find((item) => item.priceId === newItem.priceId);
					if (match) {
						return prev.map((item) => {
							if (item.priceId === newItem.priceId) {
								return { ...item, quantity: item.quantity + newItem.quantity };
							} else return item;
						});
					} else return [...prev, newItem];
				});
			},
		}),
		[]
	);

	return (
		<CartContext.Provider value={{ cart, handlers }}>
			{children}
		</CartContext.Provider>
	);
}
