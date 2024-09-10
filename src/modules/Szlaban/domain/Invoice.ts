import InvoiceItem from "./InvoiceItem";
import { Id } from "../../../shared/domain/Id";
import Address from "./Address";
class AggregateRoot {}

export default class Invoice extends AggregateRoot {
  protected invoiceItems: InvoiceItem[] = [];

  constructor(
    readonly id: Id<Invoice>,
    readonly date: Date,
    readonly address: Address
  ) {
    super();
  }

  addInoviceItem(invoiceItem: InvoiceItem) {
    this.invoiceItems.push(invoiceItem);
  }
}

// //////////////////////////////////////////////////

// const invoice = new Invoice(
//   new Id(),
//   new Date(),
//   new Address(
//     "123",
//     "10B",
//     "California",
//     "Main Street",
//     "Los Angeles",
//     "90001",
//     "USA"
//   )
// );

// const invoiceItem = new InvoiceItem(new Id(),"Klocki", 3);

// const invoiceItem2 = new InvoiceItem(new Id(),"Stare Pierniki", 5);

// invoice.addInoviceItem(invoiceItem);

// if (invoiceItem2.name == "Stare Pierniki" && invoiceItem2.quantity > 4) {
//   throw new Error();
// } else {
//   invoice.addInoviceItem(invoiceItem2);
// }
// //invoice.save();
