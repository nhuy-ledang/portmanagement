export const isFormEditValid = (email, password) => {
  return email && email.trim() !== "" && password && password.trim() !== "";
};
