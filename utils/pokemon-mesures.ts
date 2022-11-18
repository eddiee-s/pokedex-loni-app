export function getPokemonHeightMeters(num:number) {
    const m = (Math.round(num * 100) / 1000).toFixed(2)
    return `${m}m`
}

export function getPokemonHeightFt(num:number) {
    const ft = (Math.round(((Math.round(num * 100) / 1000)*3.28084)* 100) / 100).toFixed(2) 
    return `${ft}ft`
}

export function getPokemonWeightKg(num:number) {
    const kg = (Math.round(num * 100) / 1000).toFixed(2) 
    return `${kg} kg`
}

export function getPokemonWeightLbs(num:number) {
    const lbs = (Math.round((num*2.20462262185)* 100) / 1000).toFixed(2) 
    return `${lbs} lbs`
}


