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
			blocks: {
				on: {
					'blocks.simple': {
						populate: {
							cta: true,
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
