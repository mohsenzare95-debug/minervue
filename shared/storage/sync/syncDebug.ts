let syncCounter = 0;

export function createSyncTrace(label: string) {
  const syncId = `${label}-${++syncCounter}-${Date.now()}`;

  console.log(`🧭 [SYNC ${syncId}] INIT`);

  return {
    id: syncId,

    log(step: string, data?: any) {
      console.log(`🧭 [SYNC ${syncId}] ${step}`, data ?? "");
    },

    end() {
      console.log(`🧭 [SYNC ${syncId}] END`);
    },
  };
}