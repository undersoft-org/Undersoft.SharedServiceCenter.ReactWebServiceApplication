import { Account } from '../../domain/models/account';
import { StoreBase } from './storeBase';

export default class AccountStore extends StoreBase<Account, Account> {
    public constructor(endpoint: string) {
        super(endpoint);
    }
}

export const accounts = new AccountStore('Accounts');

export const currentAccount: Account = { Id: 0, Label: "" } as Account;