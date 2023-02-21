import React from "react"
import { get as _get } from 'lodash'

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => getStickyValue(key, defaultValue))
    React.useEffect(() => {
        if(value.inStorage){
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])
    return [value, setValue]
}

function getStickyValue(key, defaultValue='', globalVarName='$DEVC'){
    const stickyValue = window.localStorage.getItem(key)
    if(typeof stickyValue !== 'undefined' && stickyValue){
        return JSON.parse(stickyValue)
    }
    let globalValue = _get(window, [globalVarName,key])
    if(globalValue!==false){
        return {inStorage: false, value: globalValue}
    }
    return {inStorage: false, value: defaultValue}
}

export {useStickyState, getStickyValue}
