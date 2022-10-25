"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (order, callback) => {
    // Don't use the user-provided inputs directly in string, instead use ? where variables should be added
    // and pass variables as array to query function as it makes your system vulnerable to SQL injection attacks
    const queryString = "INSERT INTO PassportOrder (passport_swap_item_id, customer_id) VALUES (?, ?)";
    db_1.db.query(queryString, [order.passport.id, order.customer.id], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        // an OK packet is sent from server to client to signal success
        // returned type is union of several types so convert to <OkPacket> type
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (orderId, callback) => {
    const queryString = `
    SELECT
    o.*,
    p.*,
    c.name AS customer_name,
    c.email
    FROM PassportSwapOrder AS o
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN PassportSwap AS p ON p.id=o.passport_swap_item_id
    WHERE o.order_id=?`;
    db_1.db.query(queryString, orderId, (err, result) => {
        if (err) {
            callback(err);
        }
        // <RowDataPacket> = name of the constructor function that creates object
        const row = result[0];
        const order = {
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
        };
        callback(null, order);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
    SELECT
    o.*,
    p.*,
    c.name AS customer_name,
    c.email
    FROM PassportSwapOrder AS o
    INNER JOIN Customer AS c ON c.id=o.customer_id
    INNER JOIN Passport AS p ON p.id=o.passport_swap_item_id`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach(row => {
            const order = {
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
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.findAll = findAll;
const update = (order, callback) => {
    const queryString = `UPDATE PassportSwapOrder SET passport_swap_item_id=? WHERE order_id=?`;
    db_1.db.query(queryString, [order.passport.id, order.orderId], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
