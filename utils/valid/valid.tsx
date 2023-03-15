const valid = (
  dueDate: any,
      invoiceDate: any,
      quantity: any,
      amount: any,
      description: any,
) => {
  if (!dueDate || !invoiceDate || !quantity || !amount || !description)
    return "Please add all fields.";
};

export default valid;
