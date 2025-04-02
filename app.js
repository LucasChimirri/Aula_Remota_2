const { OpenWeatherAPI } = require("openweather-api-node");

const cidade = process.argv[2]; // Declara a variável "Cidade"

if (!cidade) {
    console.error("Forneça o nome de uma cidade como argumento entre aspas"); // Critica a chamada do serviço sem parâmetro de cidade
    process.exit(1);
}

let weather = new OpenWeatherAPI({
    key: "6d6e78462231ba2c4ec32d3ccb537281",    // Parametriza uma chave de acesso à API
    locationName: cidade,                       // Define a variável "Cidade" de entrada como locationName
    units: "metric"                             // Define o sistema de medida como métrico
});

weather
    .getCurrent().then(data => {
        const temperatura = data.weather.temp.cur;              // Guarda o resultado da Temperatura atual na variável "Temperatura"
        const condicao = data.weather.description;              // Guarda o resultado da Condicao atual na variável "Condicao"
        const sensacaoTermica = data.weather.feelsLike.cur      // Guarda o resultado da Sensação Térmica atual na variável "SensacaoTermica"

        console.log(`Previsão do tempo para ${cidade}:`);
        console.log(`- Temperatura: ${temperatura ? `${temperatura}°C` : "Não disponível"}`);               // Imprime no terminal a variável Temperatura ou indica indisponibilidade
        console.log(`- Condição: ${condicao ? condicao : "Não disponível"}`);                               // Imprime no terminal a variável Condição em inglês ou indica indisponibilidade
        console.log(`- Sensação térmica: ${sensacaoTermica ? `${sensacaoTermica}°C` : "Não disponível"}`);  // Imprime no terminal a variável Sensação Térmica ou indica indisponibilidade
    })
    .catch(error => {
        console.error("Ocorreu um erro ao obter os dados do clima:", error.message); // Reporta que houve erro na chamada
    });
