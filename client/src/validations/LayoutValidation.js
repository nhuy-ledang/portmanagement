// formValidation.js
export const isFormCreateValid = (
  layoutname,
  layoutdir,
  ) => {
    return (
      layoutname && layoutname.trim() !== "" &&
      layoutdir && layoutdir.trim() !== "" 
    );
  };
  
  
  export const isFormEditValid = (
    layoutname,
  ) => {
    return (
      layoutname && layoutname.trim() !== "" 
    );
  };