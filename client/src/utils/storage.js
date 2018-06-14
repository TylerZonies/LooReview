export function getFromStorage(key){
    if(!key){
        return null;
    }

    try {
        const value = localStorage.getItem(key);
        if(value){
            return JSON.parse(value)
        }
    } catch (e) {
        return null;
    };
}

export function setInStorage(key, obj){
    if(!key){
        console.log('Error: Key is missing.');
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        console.error(e);
    }
}

export function removeFromStorage(key){
    if(!key){
        return false;
    }

    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
}