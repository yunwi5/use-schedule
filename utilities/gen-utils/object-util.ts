export function copyClassObject(orig: Object) {
    let clone = Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
    return clone;
}

// Converting logic from mongodb object to app object
export function convertToAppObject<T>(obj: any, jsonSerializable?: boolean): T {
    if (!obj || !obj?._id) return obj;
    const id = obj._id.toString();
    delete obj._id;
    const appObj: T = { ...obj, id };

    if (jsonSerializable) {
        for (let key in appObj) {
            // Date cannot be serializable
            if (appObj[key] instanceof Date) {
                appObj[key] = (appObj[key] as any).toString();
            }
        }
    }
    return appObj;
}

export function convertToAppObjectList<T>(
    array: any[],
    jsonSerializable: boolean = true,
): T[] {
    if (!array || !array.length) return array;
    return array.map((item) => convertToAppObject(item, jsonSerializable));
}
