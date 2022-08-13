const isValidatedEmailAndPassword = (email: string, password: string) => {
  if (
    email.match("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") &&
    password.length >= 8
  )
    return false;

  return true;
};

export { isValidatedEmailAndPassword };
