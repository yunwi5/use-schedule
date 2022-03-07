export function getShortName (name: string, chars?: number): string {
	return name.substring(0, chars || 3);
}

// Case insensitive search.
export function searchContains (searchWord: string, word: string): boolean {
	const searchLower = searchWord.toLowerCase().trim();
	const wordLower = word.toLowerCase();
	return wordLower.includes(searchLower);
}
