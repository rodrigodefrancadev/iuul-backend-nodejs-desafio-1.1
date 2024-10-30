// @ts-check

import { Triangulo } from './entidades/triangulo.js';
import { Vertice } from './entidades/vertice.js';
import { IO } from './helpers/io.js';

const QTD_TRIANGULOS_INICIAIS = 3;
const QTD_VERTICES_TRIANGULO = 3;

class Questao2 {
    #io;

    /** @type {Triangulo[]} */
    #triangulos;

    constructor() {
        this.#io = new IO();
        this.#triangulos = [];
    }

    rodar() {
        this.#io.escreve('Questão 2')
        this.#io.escreve(`Inicialmente defina ${QTD_TRIANGULOS_INICIAIS} triangulos iniciais`)
        this.#rotinaInicializarTriangulos()
        this.#rodarLoopPrincipal();
    }

    #rotinaInicializarTriangulos() {
        for (let i = 0; i < QTD_TRIANGULOS_INICIAIS;) {
            this.#io.escreve(`--------- DEFININDO TRIÂNGULO ${i + 1} ------------`)
            const [Va, Vb, Vc] = Array(QTD_VERTICES_TRIANGULO).fill(0).map((_, index) => {
                this.#io.escreve(`Informe os dados do vertice ${index + 1} do triângulo ${i + 1}`)
                const vertice = this.#criaVerticeComInputsDoUsuario()
                return vertice
            })

            try {
                const triangulo = new Triangulo(Va, Vb, Vc);
                this.#triangulos.push(triangulo)
                i++;
            } catch (error) {
                console.log(error.message);
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
            this.#printTriangulos()
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

    #printTriangulos() {
        this.#io.escreve('Triângulos: ');
        this.#triangulos.forEach((triangulo, index) => this.#io.escreve(`\t ${index + 1}: ${triangulo}   - lados: ${JSON.stringify(triangulo.getLados())}}`));
        this.#io.escreve('--------------------------');
    }

    #rotinaFazerAlgumaOperacao() {
        this.#io.escreve(`Escolha uma operação:`);
        this.#io.escreve(`\t 1 - Verificar igualdade`);
        this.#io.escreve(`\t 2 - Verificar perímetro`);
        this.#io.escreve(`\t 3 - Clonar`);
        this.#io.escreve(`\t 4 - Verificar area`);
        this.#io.escreve(`\t 5 - Verificar tipo`);

        const operacao = this.#io.lerOpcao('Operação Selecionada: ', ['1', '2', '3', '4', '5']);

        switch (operacao) {
            case '1':
                this.#rotinaVerificaIgualdade();
                break;

            case '2':
                this.#rotinaVerificarPerimetro();
                break;

            case '3':
                this.#rotinaClonar()
                break;

            case '4':
                this.#rotinaVerificarArea();
                break;

            case '5':
                this.#rotinaVerificarTipo();
                break;
        }
        this.#io.pause()
    }

    #rotinaVerificaIgualdade() {
        this.#io.escreve('Verificando igualdade')

        const { index: index1, triangulo: t1 } = this.#getTrianguloEscolhidoPeloUsuario('Escolha o Triângulo 1')

        const { index: index2, triangulo: t2 } = this.#getTrianguloEscolhidoPeloUsuario('Escolha Triângulo 2', index1)

        const saoIguais = t1.equals(t2)
        this.#io.escreve(`Os triângulos ${index1 + 1} ${t1} e ${index2 + 1} ${t2.toString()} são ${saoIguais ? 'iguais' : 'diferentes'}.`)
    }

    #rotinaVerificarPerimetro() {
        this.#io.escreve('Verificando perímetro');

        const { index, triangulo } = this.#getTrianguloEscolhidoPeloUsuario('Escolha o Triângulo');

        const perimetro = triangulo.perimetro;

        this.#io.escreve(`O Triângulo ${index + 1} ${triangulo} tem perímetro ${perimetro}`);
    }

    #rotinaClonar() {
        this.#io.escreve('Clonando triângulo');

        const { index, triangulo } = this.#getTrianguloEscolhidoPeloUsuario('Escolha o Triângulo');

        const clone = triangulo.clone();
        const indexClone = this.#triangulos.push(clone) - 1;

        this.#io.escreve(`O Triângulo ${index + 1} ${triangulo} foi clonado na posição ${indexClone + 1}`);
    }

    #rotinaVerificarArea() {
        this.#io.escreve('Verificando area');

        const { index, triangulo } = this.#getTrianguloEscolhidoPeloUsuario('Escolha o Triângulo');

        const area = triangulo.area;

        this.#io.escreve(`O Triângulo ${index + 1} ${triangulo} tem area ${area}`);
    }

    #rotinaVerificarTipo() {
        this.#io.escreve('Verificando tipo');

        const { index, triangulo } = this.#getTrianguloEscolhidoPeloUsuario('Escolha o Triângulo');

        const tipo = triangulo.getTipo();

        this.#io.escreve(`O Triângulo ${index + 1} ${triangulo} é do tipo ${tipo}`);
    }

    /**
     * @param {string} pergunta
     * @param {number=} excetoTrianguloIndex
     * @returns {{index: number, triangulo: Triangulo}}
     */
    #getTrianguloEscolhidoPeloUsuario(pergunta, excetoTrianguloIndex) {
        const indicesTriangulos = this.#triangulos.map((_, i) => i);
        const indicesDisponiveis = excetoTrianguloIndex === undefined ? indicesTriangulos : indicesTriangulos.filter(index => index !== excetoTrianguloIndex);
        const indicesDisponiveisParaRenderizar = indicesDisponiveis.map(i => (i + 1).toString());
        this.#io.escreve(`${pergunta}: ${indicesDisponiveisParaRenderizar.join(', ')}`);
        const trianguloIndexString = this.#io.lerOpcao('Triângulo Selecionado: ', indicesDisponiveisParaRenderizar);
        const trianguloIndex = Number(trianguloIndexString) - 1;
        const triangulo = this.#triangulos[trianguloIndex]
        if (!triangulo) {
            throw new Error('Erro interno: triângulo não encontrado')
        }
        this.#io.escreve(`Triângulo Selecionado: ${trianguloIndexString} ${triangulo}`)
        return { index: trianguloIndex, triangulo }
    }
}


const questao2 = new Questao2()

questao2.rodar()

export { }