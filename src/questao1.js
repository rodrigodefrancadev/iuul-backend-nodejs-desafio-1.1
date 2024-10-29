// @ts-check

import { Vertice } from './entidades/vertice.js';
import { IO } from './helpers/io.js';

const io = new IO();

io.escreve('Questão 1')
io.escreve("Inicialmente defina os 3 vertices (A, B e C)")

const nomesDosVertices = ['A', 'B', 'C']
/** @type {Map<string, Vertice>} */
const verticesMap = new Map();

nomesDosVertices.forEach((nomeDoVertice) => {
    io.escreve(`Informe os dados do vertice ${nomeDoVertice}`)
    const vertice = criaVerticeComInputsDoUsuario()
    verticesMap.set(nomeDoVertice, vertice)
})

while (true) {
    printVertices()

    io.escreve(`Opções: \n\t1 - Fazer operação\n\t0 - Encerrar Programa`)
    const opcaoMenuPrincipal = io.lerOpcao('Opção: ', ['1', '0'])

    switch (opcaoMenuPrincipal) {
        case '1':
            rotinaFazerOperacao();
            break;
        case '0':
            io.escreve('Até mais 0/')
            process.exit();
    }
}

function rotinaFazerOperacao() {
    const { verticeNome, vertice } = getVerticeEscolhidoPeloUsuario('Escolha um vertice para fazer operação')

    io.escreve(`Escolha uma operação sob o vertice ${verticeNome}:`)
    io.escreve(`\t 1 - Calcular distancia para outro vértice`)
    io.escreve(`\t 2 - Verificar igualdade com outro vertice`)
    io.escreve(`\t 3 - Mover`)
    const operacao = io.lerOpcao('Operação Selecionada: ', ['1', '2', '3'])
    switch (operacao) {
        case '1':
            const {
                verticeNome: vertice2Nome,
                vertice: vertice2
            } = getVerticeEscolhidoPeloUsuario('Escolha o outro vértice', verticeNome)
            const distancia = vertice.distanciaAte(vertice2)
            io.escreve(`A distância entre ${verticeNome} ${vertice.toString()} e ${vertice2Nome} ${vertice2.toString()} é ${distancia}`)
            break;

        case '2':
            const {
                verticeNome: vertice2Nome_,
                vertice: vertice2_
            } = getVerticeEscolhidoPeloUsuario('Escolha o outro vértice', verticeNome)
            const ehIgual = vertice.equals(vertice2_)
            io.escreve(`Os vértices ${verticeNome} ${vertice.toString()} e ${vertice2Nome_} ${vertice2_.toString()} são ${ehIgual ? 'iguais' : 'diferentes'}.`)
            break;

        case '3':
            const x = io.lerNumber('Novo X: ')
            const y = io.lerNumber('Novo Y: ')
            vertice.move(x, y)
            io.escreve(`Véstice ${verticeNome} agora posicionado em ${vertice.toString()}`)
            break;
    }
    io.pause()
}


/**
 * @returns {Vertice}
 */
function criaVerticeComInputsDoUsuario() {
    const x = io.lerNumber('X: ')
    const y = io.lerNumber('Y: ')
    const vertice = new Vertice(x, y)
    return vertice
}


function printVertices() {
    io.escreve('VÉRTICES: ')
    Array.from(verticesMap.entries()).forEach(([nome, vertice]) => io.escreve(`\t ${nome} ${vertice.toString()}`))
    io.escreve('--------------------------')
}

/**
 * @param {string} pergunta
 * @param {string=} excetoVerticeNome
 * @returns {{verticeNome: string, vertice: Vertice}}
 */
function getVerticeEscolhidoPeloUsuario(pergunta, excetoVerticeNome) {
    const verticesDisponiveis = excetoVerticeNome === undefined ? nomesDosVertices : nomesDosVertices.filter(v => v !== excetoVerticeNome)
    io.escreve(`${pergunta}: ${verticesDisponiveis.join(', ')}`)
    const verticeNome = io.lerOpcao('Vertice Selecionado: ', verticesDisponiveis)
    const vertice = verticesMap.get(verticeNome)
    if (!vertice) {
        throw new Error('Erro interno')
    }
    io.escreve(`Vertice Selecionado: ${verticeNome} ${vertice.toString()}`)
    return { verticeNome, vertice }
}

export { }