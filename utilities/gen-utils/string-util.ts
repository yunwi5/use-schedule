export function getShortName(name: string, numChars?: number): string {
    return name.substring(0, numChars || 3);
}

export function getShortNameWithRest(name: string, numChars: number, numRests: number = 3): string {
    const shortName = name.substring(0, numChars);
    let rest = name.length <= numChars ? "" : ".".repeat(numRests);
    return `${shortName}${rest}`;
}

// Case insensitive search.
export function searchContains(searchWord: string, word: string): boolean {
    const searchLower = searchWord.toLowerCase().trim();
    const wordLower = word.toLowerCase();
    return wordLower.includes(searchLower);
}
