import { supabase } from "@/shared/supabase/client";

export async function POST(req: Request) {
  const { userId, deckKey } = await req.json();

  const orderId = crypto.randomUUID();

  // 1. create order
  await supabase.from("orders").insert({
    order_id: orderId,
    user_id: userId,
    deck_key: deckKey,
    amount: 19.99,
    currency: "USDT",
    status: "pending",
  });

  // 2. create INVOICE (IMPORTANT CHANGE)
  const res = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: 19.99,
      price_currency: "usd",
      pay_currency: "usdttrc20",

      order_description: JSON.stringify({ orderId }),

      success_url: "http://localhost:3000/deck",
      cancel_url: "http://localhost:3000/deck",
    }),
  });

  const data = await res.json();

  return Response.json({
    payment_url: data.invoice_url, // مهم
    payment_id: data.id,
    orderId,
  });
}