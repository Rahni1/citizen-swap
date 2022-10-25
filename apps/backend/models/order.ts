import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../db"
import { OkPacket, RowDataPacket } from "mysql2"

export const create = (order: BasicOrder, callback: Function) => {
    // Don't use the user-provided inputs directly in string, instead use ? where variables should be added
    // and pass variables as array to query function as it makes your system vulnerable to SQL injection attacks
    const queryString = "INSERT INTO PassportOrder (passport_swap_item_id, customer_id) VALUES (?, ?)"

    db.query(
        queryString,
        [order.passport.id, order.customer.id],
        (err, result) => {
            if (err) {callback(err)};
        // an OK packet is sent from server to client to signal success
        // returned type is union of several types so convert to <OkPacket> type
            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
        }
    )
}
  

export const findOne = (orderId: number, callback: Function) => {
    const queryString = `
    SELECT
    o.*,
    p.*,
    c.name AS customer_name,
    c.email
    FROM PassportSwapOrder AS o
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN PassportSwap AS p ON p.id=o.passport_swap_item_id
    WHERE o.order_id=?`

    db.query(queryString, orderId, (err, result) => {
        if (err) {callback(err)}
// <RowDataPacket> = name of the constructor function that creates object
        const row = (<RowDataPacket> result)[0];
        const order: OrderWithDetails = {
            orderId: row.order_id,
            customer: {
                id: row.customer_id,
                name: row.name,
                email: row.email
            },                                                                                                                                         
            passport: {
            id: row.passport_swap_item_id,
            currentPassport: row.current_passport,
            selectedSwapPassport: row.selected_swap_passport,
            price: row.price
            }
        }
            callback(null, order)
    })
}

export const findAll = (callback: Function) => {
    const queryString = `
    SELECT
    o.*,
    p.*,
    c.name AS customer_name,
    c.email
    FROM PassportSwapOrder AS o
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN Passport AS p ON p.id=o.passport_swap_item_id`
    db.query(queryString, (err, result) => {
        if (err) {callback(err)}

        const rows = <RowDataPacket[]> result;
        const orders: Order[] = [];

        rows.forEach(row => {
            const order: OrderWithDetails = {
                orderId: row.order_id,
                customer: {
                    id: row.customer_id,
                    name: row.customer_name,
                    email: row.email
                },
                passport: {
                    id: row.id,
                    currentPassport: row.current_passport,
                    selectedSwapPassport: row.selected_swap_passport,
                    price: row.price
                }
            }
                orders.push(order);          
        })
        callback(null, orders)
    })
}

export const update = (order: Order, callback: Function) => {
    const queryString = `UPDATE PassportSwapOrder SET passport_swap_item_id=? WHERE order_id=?`;

    db.query(
        queryString,
        [order.passport.id, order.orderId],
        (err, result) => {
            if (err) {callback(err)}
            callback(null);
        }
    )
}