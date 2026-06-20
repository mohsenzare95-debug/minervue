export function getEventId(e: any): string {
  return e.client_event_id ?? e.id;
}