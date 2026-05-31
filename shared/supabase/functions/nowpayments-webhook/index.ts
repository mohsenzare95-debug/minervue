//shared\supabase\functions\nowpayments-webhook\index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

export default async function handler(req: Request) {
  const body = await req.json();

  // ======================
  // 1. Verify payment status
  // ======================
  if (body.payment_status !== "finished") {
    return new Response("ignored");
  }

  const userId = body.order_description?.userId;
  const deckKey = body.order_description?.deckKey;

  if (!userId || !deckKey) {
    return new Response("invalid payload", { status: 400 });
  }

  // ======================
  // 2. Idempotency (VERY IMPORTANT)
  // ======================
  const { data: existing } = await supabase
    .from("deck_access")
    .select("*")
    .eq("user_id", userId)
    .eq("deck_key", deckKey)
    .single();

  if (existing) {
    return new Response("already unlocked");
  }

  // ======================
  // 3. Unlock deck
  // ======================
  await supabase.from("deck_access").insert({
    user_id: userId,
    deck_key: deckKey,
  });

  return new Response("ok");
}