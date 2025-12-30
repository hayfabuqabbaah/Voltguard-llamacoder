export function parsePaste(text: string): number[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Split by comma, semicolon, space, tab, or newline
  const values = text
    .split(/[,;\s\n\t]+/)
    .map(str => str.trim())
    .filter(str => str.length > 0)
    .map(str => {
      // Remove any non-numeric characters except decimal point and minus sign
      const cleanStr = str.replace(/[^0-9.-]/g, '');
      const num = parseFloat(cleanStr);
      return isNaN(num) ? null : num;
    })
    .filter(num => num !== null) as number[];
  
  return values;
}