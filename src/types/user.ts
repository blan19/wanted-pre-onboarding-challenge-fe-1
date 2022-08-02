type User = {
  email: string;
  password: string;
};

type ResponseUser = {
  message: string;
  token: string;
};

export type { User, ResponseUser };
