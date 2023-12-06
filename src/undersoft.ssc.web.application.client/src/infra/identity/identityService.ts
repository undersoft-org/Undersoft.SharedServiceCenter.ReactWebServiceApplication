import { AccountIdentity } from '../../app/models/accountIdentity';
import { StoreService } from '../store/storeService';

export default class IdentityService extends StoreService<AccountIdentity, AccountIdentity> {
    public constructor(endpoint: string) {
        super(endpoint);
    }
}

export const identityService = new IdentityService('data/crud/AccountIdentity');