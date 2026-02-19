export type AccountType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

export type AccountStoreType = {
  account: AccountType | null;
  loading: boolean;
  getAccount: () => Promise<boolean>;
  clearAccount: () => void;
};