import { fetchAPI } from '@/utils/fetchAPI';
import qs from 'qs';
import CheckoutButton from '../components/CheckoutButton';
import CartContextProvider from '@/utils/context/CartContextProvider';

// product id
// prod_TL9xbMWq73Iz8g
// price_1SOTdBL9DG9PVRBWzZSFZW9H

// Test card
// 4242424242424242

// success session href
// http://localhost:3000/success?session_id=cs_test_a1qgm7lcdlSo5jww7x4JnJLDROiXVdeWfSd1kB1W7CSXiRBWdMbMzFoClS

export default async function TestPage() {
	const AUTH_TOKEN = process.env.AUTH_TOKEN;
	const BASE_URL = process.env.STRAPI_API_URL;
	const path = '/api/products';
	// const path = '/api/test-page';
	// const path = '/api/test-page?populate=*';
	const url = new URL(path, BASE_URL);

	// url.search = qs.stringify({
	// 	fields: ['name', 'description', 'price', 'netWeight'],
	// 	populate: {
	// 		image: {
	// 			fields: ['alternativeText', 'name', 'url'],
	// 		},
	// 		category: {
	// 			fields: ['name'],
	// 		},
	// 	},
	// });

	// url.search = qs.stringify({
	// 	populate: {
	// 		background: {
	// 			fields: ['alternativeText', 'name', 'url'],
	// 		},
	// 		blocks: {
	// 			on: {
	// 				'blocks.simple': {
	// 					populate: {
	// 						categories: {
	// 							fields: ['name', 'slug', 'description'],
	// 							populate: {
	// 								products: {
	// 									fields: ['name', 'description', 'price', 'netWeight'],
	// 									populate: {
	// 										image: {
	// 											fields: ['alternativeText', 'name', 'url'],
	// 										},
	// 									},
	// 								},
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	const data = await fetchAPI(url.href, {
		method: 'GET',
		authToken: AUTH_TOKEN,
	});

	return (
		<CartContextProvider>
			<CheckoutButton />
			{/* <BuyButton priceId='price_1SOTdBL9DG9PVRBWzZSFZW9H' /> */}
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</CartContextProvider>
	);
}
