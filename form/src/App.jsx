import "bulma/css/bulma.min.css";
import "./App.css";
import { useState, useEffect } from "react";

const valoresIniciaisDoFormulario = {
  nomeCompleto: "",
  email: "",
  regiao: "",
  estado: "",
  municipio: "",
};
function App() {
  const buscarMunicipiosFiltradosPorEstado = () => {
    return new Promise((resolve, reject) => {
      if (formValores.regiao === "") resolve([]);
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formValores.estado}/municipios`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          resolve(data);
        });
    });
  };

  const bucarEstadosFiltradosPorRegiao = () => {
    return new Promise((resolve, reject) => {
      if (formValores.regiao === "") resolve([]);
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${formValores.regiao}/estados`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          resolve(data);
        });
    });
  };

  const botaoDesabilitado = () => {
    const campos = Object.keys(formValores);
    const camposPreenchidos = campos.filter(
      (campo) => formValores[campo] !== ""
    );
    return campos.length > camposPreenchidos.length;
  };

  const [formValores, setFormValores] = useState(valoresIniciaisDoFormulario);
  const [desabilitaBotao, setDesabilitaBotao] = useState(botaoDesabilitado());
  const [regioes, setRegioes] = useState([]);
  const [estadoFiltrado, setEstadoFiltrado] = useState([]);
  const [municipioFiltrado, setMunicipioFiltrado] = useState([]);

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
    bucarEstadosFiltradosPorRegiao().then((estados) => {
      setEstadoFiltrado(estados);
      setMunicipioFiltrado([]);
    });
  }, [formValores.regiao]);

  useEffect(() => {
    buscarMunicipiosFiltradosPorEstado().then((municipios) =>
      setMunicipioFiltrado(municipios)
    );
  }, [formValores.estado]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://servicodados.ibge.gov.br/api/v1/localidades/regioes?orderBy=nome"
  //     );
  //     const data = await response.json();
  //     setRegioes(data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/regioes?orderBy=nome"
      );
      const data = await response.json();
      setRegioes(data);
    })();
  }, []);


  useEffect(() => setDesabilitaBotao(botaoDesabilitado()), [formValores]);

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
                    name="regiao"
                    onChange={escutandoValorDosCampos}
                    value={formValores.regiao}
                  >
                    <option value="">Escolha a Região</option>
                    {regioes.map((regiao) => (
                      <option value={regiao.id} key={regiao.id}>
                        {regiao.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="column">
                <div className="select">
                  <select
                    name="estado"
                    onChange={escutandoValorDosCampos}
                    value={formValores.estado}
                    disabled={estadoFiltrado.length === 0}
                  >
                    <option value="">
                      Escolha o Estado ({estadoFiltrado.length})
                    </option>
                    {estadoFiltrado.map((estado) => (
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
                    disabled={municipioFiltrado.length === 0}
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
