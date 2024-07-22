import Email from "./Email";
import Entity from "../../../../shared/Entity";

export default class User implements Entity{
    constructor(protected name:string, protected email: Email)
    {

    }
}