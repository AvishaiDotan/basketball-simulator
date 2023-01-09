export const UtilService = {
    saveToStorage,
    loadFromStorage, 
    getRandomNumber
}

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string): any {
    const data = localStorage.getItem(key)
    return JSON.parse(data as any)
}

function getRandomNumber() {
    return Math.round(Math.random() * 100)

}