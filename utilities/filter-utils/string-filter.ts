export function nameFilterCallback(item: { name: string }, filterWord: string): boolean {
    return item.name.toLowerCase().includes(filterWord.trim().toLowerCase());
}

export function filterItemsByName(items: Array<{ name: string }>, filterWord: string) {
    return items.filter((item) => nameFilterCallback(item, filterWord));
}
