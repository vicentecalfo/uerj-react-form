const config = {
  nomeCompleto: {
    min: {
      check: (value) => value.length >= 6,
      message: "O nome está muito curto",
    },
    max: {
      check: (value) => value.length <= 12,
      message: "O nome está muito longo",
    },
  },
  email: {
    valido: {
      check: (value) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
      message: "Não parece um e-mail válido",
    },
  },
  regiao: {
    valido: {
      check: (value) => value !== "",
      message: "Campo obrigatório.",
    },
  },
  estado: {
    valido: {
      check: (value) => value !== "",
      message: "Campo obrigatório.",
    },
  },
  municipio: {
    valido: {
      check: (value) => value !== "",
      message: "Campo obrigatório.",
    },
  },
};
export default config;
