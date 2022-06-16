export function getShortName(name: string, numChars?: number): string {
    return name.substring(0, numChars || 3);
}

export function getShortNameWithRest(name: string, numChars: number, numRests: number = 3): string {
    const shortName = name.substring(0, numChars);
    let rest = name.length <= numChars ? '' : '.'.repeat(numRests);
    return `${shortName}${rest}`;
}

// Different from shortName. It gets first letter of the name.
// For example, name is 'Fernando Tatis Junior', then the initial will be 'FT'.
export function getNameInitial(name: string | null | undefined) {
    if (!name) return 'U';
    const words = name.split(' ');

    let initial = words
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    return initial;
}

// Case insensitive search.
export function searchContains(searchWord: string, word: string): boolean {
    const searchLower = searchWord.toLowerCase().trim();
    const wordLower = word.toLowerCase();
    return wordLower.includes(searchLower);
}

// email validation
export const validateEmail = (email: string): boolean => {
    const result = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    return !!result;
};
