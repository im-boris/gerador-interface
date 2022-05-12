const { lerArquivo, gravarArquivo } = require('./fileUtils');
const config = require('./configuracoes.json');
const tipagem = require('./tipagem.json');

async function start() {
    const conteudoClasse = await lerArquivo(config.path, config.nomeArquivo, config.extensaoArquivo, config.encoding);
    const dados = obterDadosClasseJava(conteudoClasse, config);
    const atributosDest = converterAtributos(dados.atributos, config);
    await montarTemplate(dados.nomeClasse, atributosDest, config);
}

function obterDadosClasseJava(conteudoClasse, config) {
    const nomeClasse = conteudoClasse.match(new RegExp(config.regexNomeClasse,'g'))[0];
    const atributos = conteudoClasse.match(new RegExp(config.regexAtributos,'g'));
    return {nomeClasse, atributos};
}

function converterAtributos(atributos, config) {
    const atributoOpcional = config.todosAtributosOpcionais ? '?': '';
    return atributos.map(at => {

        at = at.split(' ');
        const tipo = at[0]
        const nome = at[1];

        let tipoDestino = tipagem[tipo] ? tipagem[tipo] : 'Sem mapeamento';
        
        return nome + atributoOpcional + ': ' + tipoDestino + ';'
        
    });
}

async function montarTemplate(nomeClasse, atributosDest, config) {
    let conteudoTemplate = await lerArquivo(config.pathTemplate, config.nomeArquivoTemplate, config.extensaoArquivoTemplate, config.encoding);
    conteudoTemplate = conteudoTemplate.replace('#nomeInterface#', nomeClasse);
    conteudoTemplate = conteudoTemplate.replace('#atributos#', "\t"+atributosDest.join('\n\t'));
    await gravarArquivo(config.pathSaida, config.nomeArquivoSaida? config.nomeArquivoSaida : config.nomeArquivo, config.extensaoArquivoSaida, conteudoTemplate);
}

start();