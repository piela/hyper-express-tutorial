import { Id } from "../../../shared/domain/Id";
import PhoneNumber from "../../../shared/domain/PhoneNumber";


export default class Gate {
    constructor (
        protected id: Id<Gate>, 
        protected name: string, 
        protected description: string, 
        protected type: String,
        protected data: Date,
        protected phoneNumber: PhoneNumber
         
    )  {
    
    }

}

