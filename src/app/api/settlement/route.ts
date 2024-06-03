import { NextRequest, NextResponse } from 'next/server';

let settlementData = {
  amount: 1000,
  response: null,
  lastModified: new Date().toISOString()
};

export async function GET(req: NextRequest) {
  return NextResponse.json(settlementData);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { amount, response } = data;

  if (amount !== undefined) {
    settlementData.amount = amount;
    settlementData.lastModified = new Date().toISOString();
  }

  if (response !== undefined) {
    settlementData.response = response;
  }

  return NextResponse.json(settlementData);
}
