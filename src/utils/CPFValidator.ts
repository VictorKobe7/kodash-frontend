export const CPFValidator = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let digito1 = 11 - (soma % 11);
  if (digito1 === 10 || digito1 === 11) digito1 = 0;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let digito2 = 11 - (soma % 11);
  if (digito2 === 10 || digito2 === 11) digito2 = 0;

  return cpf.charAt(9) === digito1.toString() && cpf.charAt(10) === digito2.toString();
};
