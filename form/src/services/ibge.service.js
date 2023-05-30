class IBGEService {
  #baseURL;
  #orderBy;

  constructor() {
    this.#baseURL = "https://servicodados.ibge.gov.br/api/v1/localidades";
    this.#orderBy = "nome";
  }

  async regioes() {
    const response = await fetch(
      `${this.#baseURL}/regioes?orderBy=${this.#orderBy}`
    );
    const data = await response.json();
    return data;
  }

  async estadosPorRegioes(regiaoId) {
    if (regiaoId === "") return [];
    const response = await fetch(
      `${this.#baseURL}/regioes/${regiaoId}/estados?orderBy=${this.#orderBy}`
    );
    const data = await response.json();
    return data;
  }

  async municipiosPorEstados(estadoId) {
    if (estadoId === "") return [];
    const response = await fetch(
      `${this.#baseURL}/estados/${estadoId}/municipios?orderBy=${this.#orderBy}`
    );
    const data = await response.json();
    return data;
  }
}

export default IBGEService;
