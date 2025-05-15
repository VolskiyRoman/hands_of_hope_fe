'use client'

const setItemToStorage = (key: string, object: any) => {
    const data = JSON.stringify(object)

    if (data) {
        return localStorage.setItem(key, data)
    } else {
        return false
    }
}

const getItemFromStorage = (key: string) => {
    const data = localStorage.getItem(key)

    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}

export const localStorageService = {
    clear: () => localStorage.clear()
}