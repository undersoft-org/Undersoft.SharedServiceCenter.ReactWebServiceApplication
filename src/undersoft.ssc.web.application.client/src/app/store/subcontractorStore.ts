import { SubcontractorAccount } from '../../app/models/subcontractor';
import { StoreBase } from './storeBase';

export default class SubcontractorAccountStore extends StoreBase<SubcontractorAccount, SubcontractorAccount> {
    public constructor(endpoint: string) {
        super(endpoint);
    }
}

export const subcontractorAccounts = new SubcontractorAccountStore('Subcontractors');

export const currentSubcontractor: SubcontractorAccount = { Id: 0, Label: "" } as SubcontractorAccount;