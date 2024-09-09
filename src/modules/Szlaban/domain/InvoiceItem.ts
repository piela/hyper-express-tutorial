
import {Id} from "../../../shared/domain/Id";



export default class InvoiceItem{

constructor(readonly id: Id<InvoiceItem>, readonly name: string, readonly quantity: number)
{

}
}


