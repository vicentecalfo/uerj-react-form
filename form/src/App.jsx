import "bulma/css/bulma.min.css";
import "./App.css";
import { useState, useEffect } from "react";
// import sortBy from "underscore/modules/sortBy.js";
// import findWhere from "underscore/modules/findWhere.js";
// import where from "underscore/modules/where.js";
//import { estadosBrasileiroSigla } from "./estados";
import estados from "./estados.json";
import municipios from "./municipios.json";

const valoresIniciaisDoFormulario = {
  nomeCompleto: "",
  email: "",
  estado: "",
  municipio: "",
};
function App() {
  const buscarMunicipiosFiltradosPorEstado = () => {
    const filtrados = municipios.filter(
      (item) =>
        item.microrregiao.mesorregiao.UF.id === Number(formValores.estado)
    );
    return filtrados;
  };
  const botaoDesabilitado = () => {
    const campos = Object.keys(formValores);
    const camposPreenchidos = campos.filter((campo) => formValores[campo] !== "");
    return campos.length > camposPreenchidos.length;
  };
  const [formValores, setFormValores] = useState(valoresIniciaisDoFormulario);
  const [municipioFiltrado, setMunicipioFiltrado] = useState(
    buscarMunicipiosFiltradosPorEstado()
  );
  const [desabilitaBotao, setDesabilitaBotao] = useState(
    botaoDesabilitado()
  );

  const enviarFormulario = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = Object.fromEntries(new FormData(form));
    console.log(formData);
  };

  const limparFormulario = (event) => {
    event.preventDefault();
    setFormValores({ ...valoresIniciaisDoFormulario });
  };

  const escutandoValorDosCampos = (event) => {
    const { name, value } = event.target;
    setFormValores({ ...formValores, [name]: value });
  };

  useEffect(() => {
    setMunicipioFiltrado(buscarMunicipiosFiltradosPorEstado());
    setDesabilitaBotao(botaoDesabilitado());
  }, [formValores]);

  //const estadosBrasileiroOpcoes = sortBy(estadosBrasileiroSigla, 'nome');

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
                  <select
                    name="estado"
                    onChange={escutandoValorDosCampos}
                    value={formValores.estado}
                  >
                    <option value="">Escolha o Estado</option>
                    {estados.map((estado) => (
                      <option value={estado.id} key={estado.id}>
                        {estado.nome} ({estado.sigla})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="column">
                <div className="select">
                  <select
                    name="municipio"
                    onChange={escutandoValorDosCampos}
                    value={formValores.municipio}
                    disabled={!formValores?.estado}
                  >
                    <option value="">
                      Escolha o Município ({municipioFiltrado.length})
                    </option>
                    {municipioFiltrado.map((municipio) => (
                      <option value={municipio.id} key={municipio.id}>
                        {municipio.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button
                  className="button"
                  type="submit"
                  disabled={desabilitaBotao}
                >
                  Enviar
                </button>
              </div>
              <div className="column">
                <button
                  className="button"
                  type="reset"
                  onClick={limparFormulario}
                >
                  Limpar Formulário
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
