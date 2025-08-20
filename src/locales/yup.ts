import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  string: {
    email: "E-mail inválido",
  }
})
