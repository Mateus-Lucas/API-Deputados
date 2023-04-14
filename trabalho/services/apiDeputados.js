const { default: axios } = require("axios");

const apiDeputados = axios.create({
    baseURL: 'https://dadosabertos.camara.leg.br/api/v2'
})

export default apiDeputados