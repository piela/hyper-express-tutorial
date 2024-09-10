import { Id } from "../../../shared/domain/Id";
import Address from "../../../shared/domain/Address";
import Gate from "./Gate";
import PhoneNumber from "../../../shared/domain/PhoneNumber";


export default class Parking {
    constructor (
        protected id: Id<Parking>, 
        protected name: string, 
        protected description: string, 
        protected address: Address, 
        protected data: Date,
        protected gates: Gate[] = [],

    )  {
    
    }

addGate(gate: Gate){
    this.gates.push(gate);
}
removeGate(){

}
getGate(){}
getGates(){
    return this.gates;

}

}
///////
// const exampleAddress = new Address(
//     "123",        // houseNumber
//     "45A",        // apartmentNumber
//     "Mazowieckie",// state
//     "Main Street",// street
//     "Warsaw",     // city
//     "00-001",     // zip
//     "Poland"      // country
// )

// const parking = new Parking(new Id(), 'ParkA','Testowy Parking', exampleAddress,new Date(),[]) 
// const gate = new Gate (new Id(),'Szlaban1','TestSzlab','3metry',new Date(),new PhoneNumber('+48989888777'))

// parking.addGate(gate);
// const allGates = parking.getGates();


