export const saveData = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
export const getData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
export const deleteData = (key) => {
    return localStorage.removeItem(key)
}