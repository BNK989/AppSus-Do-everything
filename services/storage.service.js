export const storageService = {
    loadFromStorage,
    saveToStorage
}


const MAIL_KEY = 'mailDB'


function saveToStorage(key=MAIL_KEY, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key=MAIL_KEY) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}