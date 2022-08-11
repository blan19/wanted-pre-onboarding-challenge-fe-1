type AuthFormValues = {
  email: string;
  password: string;
};

type AuthFormProps = {
  type: "login" | "create";
  error: string;
  success: boolean;
  values: AuthFormValues;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & {
  children?: React.ReactNode;
};

export type { AuthFormProps, AuthFormValues };
