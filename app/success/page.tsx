import { redirect } from 'next/navigation';
import Stripe from 'stripe';
// success session href

// http://localhost:3000/success?session_id=cs_test_a1qgm7lcdlSo5jww7x4JnJLDROiXVdeWfSd1kB1W7CSXiRBWdMbMzFoClS

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: { session_id?: Promise<string> };
}) {
	const { session_id } = await searchParams;
	if (!session_id) {
		// redirect('/test-page');
		return <>No session_id</>;
	}

	// Retrieve session details (Server Component - free!)
	const session = await stripe.checkout.sessions.retrieve(await session_id);

	// if (session.payment_status !== 'paid') {
	// 	redirect('/pricing');
	// }

	return (
		<div className='max-w-2xl mx-auto p-8'>
			<div className='bg-green-50 border border-green-200 rounded-lg p-6'>
				<h1 className='text-2xl font-bold text-green-900 mb-2'>
					🎉 Payment Successful!
				</h1>
				<p className='text-green-800'>
					Thank you for your purchase, {session.customer_details?.email}
				</p>
				<p className='text-sm text-green-700 mt-2'>Order ID: {session.id}</p>
			</div>

			<div className='mt-6'>
				<a href='/dashboard' className='text-blue-600 hover:underline'>
					Go to Dashboard →
				</a>
			</div>
		</div>
	);
}
