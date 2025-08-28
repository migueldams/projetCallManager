
export const setTimeStorage = (Time: {h:number, m:number, s:number} )=>{
    console.log(Time)
    localStorage.setItem('Time',JSON.stringify(Time))
}

export const setIsTartedStorage = (isTarted: boolean)=>{
    localStorage.setItem('isTarted',JSON.stringify(isTarted))
}
export const setTimeId = (TimeId: string  )=>{
    localStorage.setItem('TimeId',TimeId)
}
export const getTimeId =  ():string | null =>{
    return localStorage.getItem('TimeId')
}

export const getTimeStorage = (): {h:number, m:number, s:number}=>{
    return JSON.parse(localStorage.getItem('Time') ?? '') as {h:number, m:number, s:number}
}
export const getIsTartedStorage = (): string | null=>{
    return localStorage.getItem('isTarted') 
}
