export function getShortName (name: string, chars?: number) {
	return name.substring(0, chars || 3);
}
