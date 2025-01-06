interface ParsedItem {
  [key: string]: string;
}

export default function Parse(input: string): ParsedItem[] {
  try {
    const jsonArray: any[] = JSON.parse(input);
    if (!Array.isArray(jsonArray)) {
      throw new Error('Invalid input. Expected an array.');
    }

    const parsedItems: ParsedItem[] = jsonArray.map((item: any) => {
      if (typeof item !== 'object') {
        throw new Error('Invalid item. Expected an object.');
      }
      const parsedItem: ParsedItem = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          parsedItem[key] = item[key] || '';
        }
      }

      return parsedItem;
    });

    return parsedItems;
  } catch (error) {
    console.error('Error parsing input:', error);
    return [];
  }
}
