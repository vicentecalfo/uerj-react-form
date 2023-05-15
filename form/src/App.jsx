import "bulma/css/bulma.min.css";
import "./App.css";
import { useState } from "react";
import sortBy from 'underscore/modules/sortBy.js'
import { estadosBrasileiroSigla } from "./estados";

const valoresIniciaisDoFormulario = {
  nomeCompleto: "",
  email: "",
};
function App() {
  const [formValores, setFormValores] = useState(valoresIniciaisDoFormulario);

  const enviarFormulario = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    console.log(formData);
  };

  const escutandoValorDosCampos = (event) => {
    const { name, value } = event.target;
    setFormValores({ ...formValores, [name]: value });
    console.log(formValores);
  };

  const estadosBrasileiroOpcoes = sortBy(estadosBrasileiroSigla, 'nome');

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Formulário de Incrição</h1>
          <p className="subtitle">Treinamento de React</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <form onSubmit={enviarFormulario}>
            <div className="columns">
              <div className="column">
                <label>Nome Completo</label>
                <input
                  className="input"
                  name="nomeCompleto"
                  type="text"
                  placeholder="Nome Completo"
                  onChange={escutandoValorDosCampos}
                  value={formValores.nomeCompleto}
                />
              </div>
              <div className="column">
                <label>E-mail</label>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Seu melhor e-mail"
                  onChange={escutandoValorDosCampos}
                  value={formValores.email}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="select">
                  <select>
                    <option>Escolha o Estado</option>
                    {estadosBrasileiroOpcoes.map((estado, estadoIndex) => (
                      <option value={estado.nome} key={estadoIndex}>{estado.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button className="button" type="submit">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default App;
