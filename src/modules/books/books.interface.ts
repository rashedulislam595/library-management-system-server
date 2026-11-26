export interface IBooks {
    title:string,
    category:string,
    publisher:string,
    published_year:number,
    total_copies:number,
    available_copies:number,
    description:string,
    author:string
}

export interface IUpdateBook {
    title:string,
    total_copies:number,
    available_copies:number,
    description:string,
    author:string
}