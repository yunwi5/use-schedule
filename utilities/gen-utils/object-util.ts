export function copyClassObject (orig: Object) {
	let clone = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
	return clone;
}
