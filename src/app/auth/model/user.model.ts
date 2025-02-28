export type FirebaseUser = {
  email: string | null;
  uid: string;
  username : string | null;
};

export type CustomUser = FirebaseUser & {
  password?: string;
  token?: string;
  customField?: string;
};
