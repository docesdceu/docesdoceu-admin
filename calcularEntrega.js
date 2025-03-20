const fetch = require('node-fetch'); // Importa o fetch para fazer requisições

const API_KEY = "pk.eyJ1IjoiZG9jZXNkb2NldSIsImEiOiJjbTg3eXpkNjEwYWE0MmpyMG5hbTNocXJ1In0.nGmctFqLA5GKQMKpv7WVEQ"; 
const ORIGEM = "-9.29659,38.77084"; // Coordenadas fixas do estabelecimento
const DISTANCIA_MAXIMA = 20.0; // Distância máxima em km
const VALOR_LISBOA = 8.0; // Valor fixo para Lisboa
const VALOR_ARREDORES = 10.0; // Valor fixo para arredores

// Coordenadas aproximadas dos limites do concelho de Lisboa
const LIMITES_LISBOA = {
    norte: 38.795,
    sul: 38.695,
    oeste: -9.230,
    leste: -9.090
};

function validarCoordenadas(coordenadas) {
    const regex = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;
    return regex.test(coordenadas);
}

function estaEmLisboa(latitude, longitude) {
    return latitude >= LIMITES_LISBOA.sul && 
           latitude <= LIMITES_LISBOA.norte && 
           longitude >= LIMITES_LISBOA.oeste && 
           longitude <= LIMITES_LISBOA.leste;
}

async function calcularEntrega(destino) {
    try {
        if (!destino) {
            throw new Error("Endereço de destino é obrigatório.");
        }

        if (!validarCoordenadas(destino)) {
            throw new Error("Formato de coordenadas inválido");
        }

        const [longitude, latitude] = destino.split(',').map(Number);
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${ORIGEM};${destino}?access_token=${API_KEY}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        if (!dados.routes || dados.routes.length === 0) {
            throw new Error("Não foi possível calcular a rota.");
        }

        const distanciaKm = dados.routes[0].legs[0].distance / 1000;

        if (distanciaKm > DISTANCIA_MAXIMA) {
            return {
                disponivel: false,
                mensagem: "Entrega não disponível para esta localização. Distância máxima excedida.",
                distancia: Math.ceil(distanciaKm * 10) / 10 // Arredonda para uma casa decimal
            };
        }

        const emLisboa = estaEmLisboa(latitude, longitude);
        const custoTotal = emLisboa ? VALOR_LISBOA : VALOR_ARREDORES;

        return {
            disponivel: true,
            mensagem: `O custo da entrega é €${custoTotal.toFixed(2)}`,
            custo: custoTotal,
            distancia: Math.ceil(distanciaKm * 10) / 10, // Arredonda para uma casa decimal
            zona: emLisboa ? "Lisboa" : "Arredores"
        };
    } catch (erro) {
        console.error("Erro ao calcular entrega:", erro);
        return {
            disponivel: false,
            mensagem: `Erro: ${erro.message}`
        };
    }
}

module.exports = calcularEntrega; 