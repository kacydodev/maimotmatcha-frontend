import { createCheckoutSession } from '../actions/checkout';

export default function BuyButton({
	priceId,
	label = 'Buy Now',
}: {
	priceId: string;
	label?: string;
}) {
	return (
		<form action={createCheckoutSession.bind(null, priceId)}>
			<button type='submit' className='bg-slate-300'>
				{label}
			</button>
		</form>
	);
}
