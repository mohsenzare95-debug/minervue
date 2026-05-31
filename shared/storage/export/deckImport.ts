//shared\storage\export\deckImport.ts
export function importDeck(file: File): Promise<any> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(JSON.parse(reader.result as string));
    };

    reader.readAsText(file);
  });
}