import { fetchAPI } from '@/utils/fetchAPI';
import qs from 'qs';

export default async function TestPage() {
	const AUTH_TOKEN = process.env.AUTH_TOKEN;
	const BASE_URL = process.env.STRAPI_API_URL;
	const path = '/api/test-page';
	// const path = '/api/test-page?populate=*';
	const url = new URL(path, BASE_URL);

	url.search = qs.stringify({
		populate: {
			background: {
				fields: ['alternativeText', 'name', 'url'],
			},
			blocks: {
				on: {
					'blocks.simple': {
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
	console.log(url.href);

	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
}
