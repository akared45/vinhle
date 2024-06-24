const validateFirstName = (firstName) => /^[a-zA-Z]+$/.test(firstName);

const validateLastName = (lastName) => /^[a-zA-Z]+$/.test(lastName);

const validateUsername = (username) => /^[a-z]+$/.test(username);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => {
  const hasMinimumLength = /.{8,}/.test(password);
  const hasSpecialCharacter = /[@#$!%&]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasAtLeastThreeDigits = /(\d.*\d.*\d)/.test(password);

  return hasMinimumLength && hasSpecialCharacter && hasUpperCase && hasAtLeastThreeDigits;
};

export { validateFirstName, validateLastName, validateUsername, validateEmail, validatePassword };
