import { CartItem } from '@/types';
import { createContext } from 'react';

interface CartContextInterface {
	cart: CartItem[] | [];
	handlers: {
		addCartItem: (newItem: CartItem) => void;
	};
}

const CartContext = createContext<CartContextInterface>({
	cart: [],
	handlers: {
		addCartItem: () => undefined,
	},
});
export default CartContext;
