import Stripe from 'stripe';
import { fetchAPI } from './fetchAPI';
import qs from 'qs';

type chunk = {
	name: string;
	description: string;
	price: number;
};

interface DataInterface {
	data: chunk[];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function seedProducts() {
	const AUTH_TOKEN = process.env.AUTH_TOKEN;
	const BASE_URL = process.env.STRAPI_API_URL;
	const path = '/api/products';
	const url = new URL(path, BASE_URL);

	url.search = qs.stringify({
		fields: ['name', 'description', 'price', 'netWeight'],
		populate: {
			image: {
				fields: ['alternativeText', 'name', 'url'],
			},
			category: {
				fields: ['name'],
			},
		},
	});

	const data: DataInterface = await fetchAPI(url.href, {
		method: 'GET',
		authToken: AUTH_TOKEN,
	});

	data.data.map(
		async (chunk: { name: string; description: string; price: number }) => {
			const product = await stripe.products.create({
				name: chunk.name,
				description: chunk.description,
			});

			// Create a price for the product
			await stripe.prices.create({
				product: product.id,
				unit_amount: chunk.price,
				currency: 'aud',
			});
		}
	);
}
