// shared/state/hydrateClientState.ts

import { clientState } from "@/shared/state/client/clientState";

let hydrated = false;

export function hydrateClientState() {
  if (hydrated) return;

  clientState.setState({
    syncStatus: "idle",
  });

  hydrated = true;
}