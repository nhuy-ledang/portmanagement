// formValidation.js
export const isFormValid = (
  adminname,
  email,
  password,
  confirmpassword,
  fullname
) => {
  return (
    adminname.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmpassword.trim() !== "" &&
    fullname.trim() !== ""
  );
};

export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};
