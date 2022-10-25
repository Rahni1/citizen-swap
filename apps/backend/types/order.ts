import { BasicPassport, Passport } from "./passport";
import { BasicCustomer, Customer } from "./customer";

// without order id is useful when creating order for first time as order does not have id yet
export interface BasicOrder {
  passport: BasicPassport,
  customer: BasicCustomer
}

export interface Order extends BasicOrder {
  orderId: number
}

export interface OrderWithDetails extends Order {
  passport: Passport,
  customer: Customer
}
