import { fetchAPI } from '@/utils/fetchAPI';
import qs from 'qs';

export default async function HomePage() {
	const AUTH_TOKEN = process.env.AUTH_TOKEN;
	const BASE_URL = process.env.STRAPI_API_URL;
	const path = '/api/home-page';
	const url = new URL(path, BASE_URL);

	url.search = qs.stringify({
		populate: {
			blocks: {
				on: {
					'blocks.hero-section': {
						populate: {
							cta: true,
							background: {
								fields: ['alternativeText', 'name', 'url'],
							},
						},
					},
					'blocks.about-section': {
						populate: {
							image: {
								fields: ['alternativeText', 'name', 'url'],
							},
						},
					},
					'blocks.product-section': {
						populate: {
							categories: {
								fields: ['name', 'slug', 'description'],
								populate: {
									products: {
										fields: ['name', 'description', 'price', 'netWeight'],
										populate: {
											image: {
												fields: ['alternativeText', 'name', 'url'],
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	});

	const data = await fetchAPI(url.href, {
		method: 'GET',
		authToken: AUTH_TOKEN,
	});

	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
}
