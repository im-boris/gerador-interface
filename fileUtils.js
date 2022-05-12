const fs = require('fs').promises;
const path = require('path');

async function lerArquivo(caminho, nomeArquivo, extensao, encoding) {
    return fs.readFile(path.normalize(caminho+nomeArquivo)+extensao, encoding);
}

async function gravarArquivo(caminho, nomeArquivo, extensao, dados) {
    return fs.writeFile(caminho+nomeArquivo+extensao, dados)
}

module.exports = {
    lerArquivo,
    gravarArquivo
}