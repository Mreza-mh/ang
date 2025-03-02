export type userdata = {
  email: string | null;
  username: string | null;
  role: string | null;
};

export type CustomUser = userdata & {
  password?: string;
  token?: string;
  customField?: string;
};
