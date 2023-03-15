const validSignIn = (
    gmail: string,
    password: string,
  ) => {
    if (!gmail || !password)
      return "Please add all fields.";
  };
  
  export default validSignIn;
  