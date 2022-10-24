// if we only need id
export interface BasicPassport {
    id: number
}

export interface Passport extends BasicPassport {
    currentPassport: string,
    selectedSwapPassport: string,
    price: number
}
