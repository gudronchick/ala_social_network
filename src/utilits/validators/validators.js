export const required = (value) => {
  if (!value) return "Required";
  return undefined;
};

export const validateEmail = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;
};

export const minSymbols = (num) => {
  return (value) => {
    if (value) return value.length < num ? `At least ${num} chars` : undefined;
  };
};
