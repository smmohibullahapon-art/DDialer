import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Direct Self-Contained Telecom Telemetry Data
    const stats = {
      activeCalls: 48,
      cps: 18.5,
      systemHealth: 99.98,
      asr: 84.2,
      acd: 165,
      pddMs: 420,
      totalChannels: 180,
      allocatedChannels: 86,
      smsDispatchedToday: 5970,
      walletBalanceBDT: 15000.0,
      tenantId: 'ten_bd_0912',
      tenantName: 'Dial Dynamic Ltd',
      activeTrunks: 4,
      carrierRoute: 'BTCL Wholesale National SBC',
      status: 'OPTIMAL'
    };

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}