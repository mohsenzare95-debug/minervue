//app\api\webhooks\nowpayments\route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/shared/supabase/client";

export async function POST(req: Request) {
  const event = await req.json();

  const { payment_status, order_description } = event;

  if (payment_status !== "finished") {
    return NextResponse.json({ ok: true });
  }

  const { orderId } = JSON.parse(order_description);

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  if (order.status === "paid") {
    return NextResponse.json({ ok: true });
  }

  // 1. mark order as paid
  await supabase
    .from("orders")
    .update({
      status: "paid",
    })
    .eq("order_id", orderId);

  // 2. create subscription (NEW SOURCE OF TRUTH)
  const now = new Date();
  const expires = new Date();
  expires.setMonth(now.getMonth() + 1);

  await supabase.from("subscriptions").insert({
    user_id: order.user_id,
    plan: "monthly",
    status: "active",
    started_at: now.toISOString(),
    expires_at: expires.toISOString(),
  });

  return NextResponse.json({ ok: true });
}