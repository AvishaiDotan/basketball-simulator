export const UtilService = {
    saveToStorage,
    loadFromStorage, 
    getRandomNumber, 
    makeId
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

function makeId(length = 10) {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return id;
  }