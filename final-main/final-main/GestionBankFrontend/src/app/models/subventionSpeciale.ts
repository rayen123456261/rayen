import { Corps } from "./corps";
import { Grade } from "./grade";
import { Subvention } from "./subvention";

export class SubventionSpeciale {
    id?: number;
    corps?: Corps;
    grade?: Grade;
    subvention?: Subvention;
    montantSubvention?: number;
}