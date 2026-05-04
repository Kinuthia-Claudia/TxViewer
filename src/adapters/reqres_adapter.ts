import { Transaction } from "../models/transaction";

type ResReqresUser = {
    id : number;
    email : string;
    first_name : string;
    last_name : string;}

export const mapReqRes = (data:{ data: ResReqresUser[] }): Transaction[] => {
    return data.data.map((item) => ({
        id : String(item.id),
        title : `${item.first_name} ${item.last_name}`,
        amount : Math.round(Math.random() *10000 * 1000)/100,
        date : new Date().toISOString(),
        source : "reqres",
    }));
}