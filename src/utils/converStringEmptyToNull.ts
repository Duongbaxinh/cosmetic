export function convertEmptyStringToNull<T>(obj: T): T {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === "") {
        obj[key as keyof T] = null as unknown as T[keyof T];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        convertEmptyStringToNull(obj[key]);
      }
    }
  }
  return obj as T;
}
