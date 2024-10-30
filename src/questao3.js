// @ts-check

import { Poligono } from './entidades/poligono.js';
import { Vertice } from './entidades/vertice.js';
import { IO } from './helpers/io.js';

class Questao3 {
    #io;
    /** @type {Poligono=} */
    #poligono;

    constructor() {
        this.#io = new IO();
    }

    #getPoligono() {
        if (!this.#poligono) {
            throw Error('Polígono não iniciado');
        }
        return this.#poligono;
    }

    rodar() {
        this.#io.escreve('Questão 3')
        this.#io.escreve("Inicialmente defina o Polígono a partir de seus vértices")
        this.#rotinaInicializarPoligono();
        this.#rodarLoopPrincipal();
    }

    #rotinaInicializarPoligono() {
        /** @type {Vertice[]} */
        const vertices = []

        while (true) {
            this.#io.escreve(`Vértices adicionados: [${vertices.map(v => `${v}`).join('; ')}] - TOTAL: ${vertices.length}`)

            this.#io.escreve(`Opções: \n\t1 - Adicionar Vértice\n\t2 - Criar Polígono`)
            const opcaoEscolhida = this.#io.lerOpcao('Opção: ', ['1', '2'])

            if (opcaoEscolhida === '1') {
                this.#io.escreve(`Informe os dados do vertice ${vertices.length + 1}`)
                const vertice = this.#criaVerticeComInputsDoUsuario()
                vertices.push(vertice)
            }
            else {
                try {
                    const poligono = new Poligono(...vertices);
                    this.#poligono = poligono;
                    break;
                }
                catch (error) {
                    console.log(error.message);
                    this.#io.pause();
                }
            }
        }
    }

    #criaVerticeComInputsDoUsuario() {
        const x = this.#io.lerNumber('X: ')
        const y = this.#io.lerNumber('Y: ')
        const vertice = new Vertice(x, y)
        return vertice
    }

    #rodarLoopPrincipal() {
        while (true) {
            this.#printPoligono()
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

    #printPoligono() {
        this.#io.escreve(`Polígono: ${this.#poligono}`);
    }

    #rotinaFazerAlgumaOperacao() {
        this.#io.escreve(`Escolha uma operação:`);
        this.#io.escreve(`\t 1 - Adicionar vértice`);
        this.#io.escreve(`\t 2 - Verificar perímetro`);
        this.#io.escreve(`\t 3 - Verificar quantidade de vértices`);

        const operacao = this.#io.lerOpcao('Operação Selecionada: ', ['1', '2', '3']);


        switch (operacao) {
            case '1':
                this.#rotinaAdicionarVertice();
                break;

            case '2':
                this.#rotinaVerificarPerimetro();
                break;

            case '3':
                this.#verificarQuantidadeDeVertices()
                break;
        }
        this.#io.pause()
    }

    #rotinaAdicionarVertice() {
        this.#io.escreve('Adicionando Vértice');
        const vertice = this.#criaVerticeComInputsDoUsuario();
        this.#getPoligono().addVertice(vertice);
        this.#io.escreve(`Vértice ${vertice} adicionado ao polígono`)
    }

    #rotinaVerificarPerimetro() {
        this.#io.escreve('Verificando perímetro');
        const perimetro = this.#getPoligono().perimetro;
        this.#io.escreve(`O perímetro do polígono é ${perimetro}`);
    }

    #verificarQuantidadeDeVertices() {
        this.#io.escreve('Verificando quantidade de vértices');
        const qtdVertices = this.#getPoligono().qtdVertices;
        this.#io.escreve(`O polígono tem ${qtdVertices} vétices`);
    }
}


const questao3 = new Questao3()

questao3.rodar()

export { }