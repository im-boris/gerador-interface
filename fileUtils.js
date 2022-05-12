const fs = require('fs').promises;

async function lerArquivo(path, nomeArquivo, extensao, encoding) {
    return fs.readFile(path+nomeArquivo+extensao, encoding);
}

async function gravarArquivo(path, nomeArquivo, extensao, dados) {
    return fs.writeFile(path+nomeArquivo+extensao, dados)
}

module.exports = {
    lerArquivo,
    gravarArquivo
}