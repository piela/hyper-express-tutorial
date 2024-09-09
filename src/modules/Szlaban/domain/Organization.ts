import { Id } from "../../../shared/domain/Id";
import Address from "./Address";

export default class Organization {
  constructor(
    readonly id: Id<Organization>,
    name: string,
    nip: string,
    type: string,
    readonly address: Address
  ) {}
}
