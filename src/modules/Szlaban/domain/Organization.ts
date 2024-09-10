import { Id } from "../../../shared/domain/Id";
import Address from "../../../shared/domain/Address";

export default class Organization {
  constructor(
    readonly id: Id<Organization>,
    readonly name: string,
    readonly nip: string,
    readonly type: string,
    readonly address: Address
  ) {}
}
