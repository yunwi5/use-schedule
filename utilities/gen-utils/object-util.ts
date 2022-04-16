export function copyClassObject(orig: Object) {
    let clone = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
    return clone;
}

// Converting logic from mongodb object to app object
export function convertToAppObject<T>(obj: any): T {
    if (!obj) return obj;
    const id = obj._id.toString();
    delete obj._id;
    const appObj: T = { ...obj, id };
    return appObj;
}

export function convertToAppObjectList<T>(array: any[]): T[] {
    if (!array) return array;
    return array.map((item) => convertToAppObject(item));
}
