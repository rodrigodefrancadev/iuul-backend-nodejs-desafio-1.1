// @ts-check

import { Vertice } from "./vertice.js";

const QTD_LADOS_TRIANGULO = 3;

export class Triangulo {
    //vertices
    #Va;
    #Vb;
    #Vc;

    //lados
    #ladoA;
    #ladoB;
    #ladoC;

    #perimetro;

    get Va() { return this.#Va }
    get Vb() { return this.#Vb }
    get Vc() { return this.#Vc }

    get perimetro() { return this.#perimetro }

    get area() {
        const s = this.perimetro / 2;
        const area = Math.sqrt(s * (s - this.#ladoA) * (s - this.#ladoB) * (s - this.#ladoC));
        return area;
    }

    /**
     * 
     * @param {Vertice} Va 
     * @param {Vertice} Vb 
     * @param {Vertice} Vc 
     */
    constructor(Va, Vb, Vc) {
        const ladoA = Va.distanciaAte(Vb);
        const ladoB = Vb.distanciaAte(Vc);
        const ladoC = Vc.distanciaAte(Va);

        const ehTriangulo = Triangulo.#ladosFormamTriangulo(ladoA, ladoB, ladoC);
        if (!ehTriangulo) {
            throw new Error(`Erro: Os vértices ${Va}, ${Vb} e ${Vc} não formam um triângulo`);
        }

        this.#Va = Va;
        this.#Vb = Vb;
        this.#Vc = Vc;

        this.#ladoA = ladoA;
        this.#ladoB = ladoB;
        this.#ladoC = ladoC;

        this.#perimetro = ladoA + ladoB + ladoC;
    }

    /**
     * 
     * @param {number} ladoA
     * @param {number} ladoB
     * @param {number} ladoC
     * @returns {boolean}
     */
    static #ladosFormamTriangulo(ladoA, ladoB, ladoC) {
        return (ladoA + ladoB > ladoC) && (ladoB + ladoC > ladoA) && (ladoA + ladoC > ladoB)
    }

    /**
     * @param {Triangulo} outroTriangulo
     * @returns {boolean} 
     */
    equals(outroTriangulo) {
        const ladosDesteTriangulo = this.getLados().sort((a, b) => a - b)
        const ladosDoOutroTriangulo = outroTriangulo.getLados().sort((a, b) => a - b)

        for (let i = 0; i < QTD_LADOS_TRIANGULO; i++) {
            if (ladosDesteTriangulo[i] !== ladosDoOutroTriangulo[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * @returns {'EQUILATERO' | 'ISOCELES' | 'ESCALENO'}
     */
    getTipo() {
        const lados = this.getLados()
        const conjuntoValoresDeLados = new Set(lados);
        const quantidadeDeValoresDeLadosDistintos = conjuntoValoresDeLados.size;

        switch (quantidadeDeValoresDeLadosDistintos) {
            case 3: // 3 lados diferentes
                return 'ESCALENO';
            case 2: // 2 lados iguais
                return 'ISOCELES';
            case 1: // Todos os lados iguais
                return 'EQUILATERO';
            default:
                throw Error('Algo errado aconteceu');
        }
    }

    getLados() {
        return [this.#ladoA, this.#ladoB, this.#ladoC];
    }

    clone() {
        return new Triangulo(this.#Va, this.#Vb, this.#Vc);
    }

    toString() {
        return `[${this.Va}, ${this.Vb}, ${this.Vc}]`
    }

}