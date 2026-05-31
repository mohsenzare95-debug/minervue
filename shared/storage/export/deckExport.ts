//shared\storage\export\deckExport.ts
export function exportDeck(deck: any) {
  const blob = new Blob([JSON.stringify(deck)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${deck.key}.json`;
  a.click();
}