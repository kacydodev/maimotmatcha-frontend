import { useContext } from 'react';
import CartContext from '../context/CartContext';

export default function useCart() {
	const context = useContext(CartContext);

	if (!context)
		throw new Error(`useCart must be wrapped inside a 'CartContextProvider'`);

	return context;
}
