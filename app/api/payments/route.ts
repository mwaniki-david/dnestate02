// import { NextRequest, NextResponse } from 'next/server';
// import { eq } from 'drizzle-orm';
// import { payments } from '@/db/schema';
// import { db } from '@/db/drizzle';

// // Create Payment and Trigger STK Push
// export async function POST(req: NextRequest) {
//   const { phoneNumber, amount, tillNumber } = await req.json();

//   try {
//     // Initiate STK Push
//     const stkResponse = await stkPush(phoneNumber, amount, tillNumber);

//     // Save payment to DB
//     await db.insert(payments).values({
//       phoneNumber,
//       amount,
//       tillNumber,
//       status: 'pending',
//     });

//     return NextResponse.json({ message: 'Payment initiated', stkResponse }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
//   }
// }

// // Update Payment Status
// export async function PUT(req: NextRequest) {
//   const { id, status } = await req.json();

//   try {
//     await db.update(payments).set({ status }).where(eq(payments.id, id));
//     return NextResponse.json({ message: 'Payment updated' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
//   }
// }

// // Get Payments
// export async function GET() {
//   try {
//     const results = await db.select().from(payments).orderBy(payments.createdAt);
//     return NextResponse.json(results, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
//   }
// }
