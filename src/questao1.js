// @ts-check

import { Vertice } from './entidades/vertice.js';
import { IO } from './helpers/io.js';

class Questao1 {
    #io;
    #nomesDosVertices;

    /** @type {Map<string, Vertice>} */
    #verticesMap;

    constructor() {
        this.#io = new IO();
        this.#nomesDosVertices = ['A', 'B', 'C'];
        this.#verticesMap = new Map();
    }

    rodar() {
        this.#io.escreve('Questão 1')
        this.#io.escreve("Inicialmente defina os 3 vertices (A, B e C)")
        this.#rotinaInicializarVertices()
        this.#rodarLoopPrincipal();
    }

    #rotinaInicializarVertices() {
        this.#nomesDosVertices.forEach((nomeDoVertice) => {
            this.#io.escreve(`Informe os dados do vertice ${nomeDoVertice}`)
            const vertice = this.#criaVerticeComInputsDoUsuario()
            this.#verticesMap.set(nomeDoVertice, vertice)
        })
    }

    #criaVerticeComInputsDoUsuario() {
        const x = this.#io.lerNumber('X: ')
        const y = this.#io.lerNumber('Y: ')
        const vertice = new Vertice(x, y)
        return vertice
    }

    #rodarLoopPrincipal() {
        while (true) {
            this.#printVertices()
            this.#io.escreve(`Opções: \n\t1 - Fazer operação\n\t0 - Encerrar Programa`)
            const opcaoEscolhida = this.#io.lerOpcao('Opção: ', ['1', '0'])

            switch (opcaoEscolhida) {
                case '1':
                    this.#rotinaFazerAlgumaOperacao();
                    break;
                case '0':
                    this.#io.escreve('Até mais 0/')
                    process.exit();
            }
        }
    }

    #printVertices() {
        this.#io.escreve('VÉRTICES: ');
        Array.from(this.#verticesMap.entries())
            .forEach(([nome, vertice]) => this.#io.escreve(`\t ${nome} ${vertice}`));
        this.#io.escreve('--------------------------');
    }

    #rotinaFazerAlgumaOperacao() {
        this.#io.escreve(`Escolha uma operação:`);
        this.#io.escreve(`\t 1 - Calcular distancia para outro vértice`);
        this.#io.escreve(`\t 2 - Verificar igualdade com outro vertice`);
        this.#io.escreve(`\t 3 - Mover`);

        const operacao = this.#io.lerOpcao('Operação Selecionada: ', ['1', '2', '3']);


        switch (operacao) {
            case '1':
                this.#rotinaCalcularDistancia();
                break;

            case '2':
                this.#rotinaVerificaIgualdade();
                break;

            case '3':
                this.#rotinaMover()
                break;
        }
        this.#io.pause()
    }

    #rotinaCalcularDistancia() {
        this.#io.escreve('Calculando Distancia')

        const { verticeNome: V1Nome, vertice: V1 } = this.#getVerticeEscolhidoPeloUsuario('Escolha o Vertice 1')

        const {
            verticeNome: V2Nome,
            vertice: V2
        } = this.#getVerticeEscolhidoPeloUsuario('Escolha Vértice 2', V1Nome)

        const distancia = V1.distanciaAte(V2)
        this.#io.escreve(`A distância entre ${V1Nome} ${V1} e ${V2Nome} ${V2} é ${distancia}`)
    }

    #rotinaVerificaIgualdade() {
        this.#io.escreve('Verificando igualdade')

        const { verticeNome: V1Nome, vertice: V1 } = this.#getVerticeEscolhidoPeloUsuario('Escolha o Vertice 1')

        const {
            verticeNome: V2Nome,
            vertice: V2
        } = this.#getVerticeEscolhidoPeloUsuario('Escolha Vértice 2', V1Nome)

        const saoIguais = V1.equals(V2)
        this.#io.escreve(`Os vértices ${V1Nome} ${V1} e ${V2Nome} ${V2} são ${saoIguais ? 'iguais' : 'diferentes'}.`)
    }

    #rotinaMover() {
        this.#io.escreve('Movendo vértice')

        const { verticeNome, vertice } = this.#getVerticeEscolhidoPeloUsuario('Escolha o Vertice')

        const x = this.#io.lerNumber('Novo X: ')
        const y = this.#io.lerNumber('Novo Y: ')

        vertice.move(x, y)

        this.#io.escreve(`Vértice ${verticeNome} agora posicionado em ${vertice}`)
    }

    /**
     * @param {string} pergunta
     * @param {string=} excetoVerticeNome
     * @returns {{verticeNome: string, vertice: Vertice}}
     */
    #getVerticeEscolhidoPeloUsuario(pergunta, excetoVerticeNome) {
        const verticesDisponiveis = excetoVerticeNome === undefined ? this.#nomesDosVertices : this.#nomesDosVertices.filter(v => v !== excetoVerticeNome)
        this.#io.escreve(`${pergunta}: ${verticesDisponiveis.join(', ')}`)
        const verticeNome = this.#io.lerOpcao('Vertice Selecionado: ', verticesDisponiveis)
        const vertice = this.#verticesMap.get(verticeNome)
        if (!vertice) {
            throw new Error('Erro interno: vértice não encontrado')
        }
        this.#io.escreve(`Vertice Selecionado: ${verticeNome} ${vertice}`)
        return { verticeNome, vertice }
    }
}


const questao1 = new Questao1()

questao1.rodar()

export { }