const calcularEntrega = require('./calcularEntrega');
const fetch = require('node-fetch');

// Exemplos de endereços
const enderecos = {
    lisboa: "-9.1377, 38.7154",      // Baixa de Lisboa
    arredores: "-9.3124, 38.7026"    // Oeiras
};

async function obterCoordenadas(endereco) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endereco)}.json?access_token=pk.eyJ1IjoiZG9jZXNkb2NldSIsImEiOiJjbTg3eXpkNjEwYWE0MmpyMG5hbTNocXJ1In0.nGmctFqLA5GKQMKpv7WVEQ&country=pt`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    
    if (dados.features && dados.features.length > 0) {
        const [longitude, latitude] = dados.features[0].center;
        return `${longitude},${latitude}`;
    }
    throw new Error("Endereço não encontrado");
}

async function testarEnderecos() {
    console.log("Testando endereço em Lisboa...");
    const resultadoLisboa = await calcularEntrega(enderecos.lisboa);
    console.log(resultadoLisboa.mensagem);
    console.log(`Zona: ${resultadoLisboa.zona}`);
    console.log(`Distância: ${resultadoLisboa.distancia} km\n`);

    console.log("Testando endereço nos arredores...");
    const resultadoArredores = await calcularEntrega(enderecos.arredores);
    console.log(resultadoArredores.mensagem);
    console.log(`Zona: ${resultadoArredores.zona}`);
    console.log(`Distância: ${resultadoArredores.distancia} km`);
}

async function testarEndereco() {
    try {
        console.log("Obtendo coordenadas para Avenida do Colégio Militar 14, 1500-185 Lisboa...");
        const coordenadas = await obterCoordenadas("Avenida do Colégio Militar 14, 1500-185 Lisboa, Portugal");
        console.log(`Coordenadas obtidas: ${coordenadas}\n`);

        console.log("Calculando custo de entrega...");
        const resultado = await calcularEntrega(coordenadas);
        console.log(resultado.mensagem);
        console.log(`Zona: ${resultado.zona}`);
        console.log(`Distância: ${resultado.distancia} km`);
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

testarEnderecos().catch(console.error);
testarEndereco(); 