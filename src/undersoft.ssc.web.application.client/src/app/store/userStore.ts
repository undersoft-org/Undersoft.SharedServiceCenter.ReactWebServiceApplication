import { UserAccount } from '../../domain/models/userAccount';
import { StoreBase } from './storeBase';

export default class UserAccountStore extends StoreBase<UserAccount, UserAccount> {
    public constructor(endpoint: string) {
        super(endpoint);
    }     
}

export const userAccounts = new UserAccountStore('Users');

export const currentUser: UserAccount = { Id: 0, Label: "", Identity: { Info: { UserName: "", Email: "" } } } as UserAccount;