// @ts-check

import { Vertice } from "./vertice.js";

const QTD_MINIMA_DE_VERTICES = 3;

export class Poligono {
    #vertices;

    get perimetro() {
        const lados = this.#vertices.map((v, index, arr) => {
            const proximoIndex = index === (arr.length - 1) ? 0 : index + 1;
            const proximoVertice = arr[proximoIndex];
            const lado = v.distanciaAte(proximoVertice);
            return lado
        })

        const perimetro = lados.reduce((acc, cur) => acc + cur, 0);
        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }

    /**
     * 
     * @param {Vertice[]} vertices
     */
    constructor(...vertices) {
        if (vertices.length < QTD_MINIMA_DE_VERTICES) {
            throw new Error(`Erro: Um poígono precisa de pelo menos 3 vértices`);
        }
        this.#vertices = vertices
    }

    /**
     * 
     * @param {Vertice} vertice 
     */
    addVertice(vertice) {
        this.#vertices.push(vertice)
    }

    toString() {
        return `[${this.#vertices.map(v => v.toString()).join('; ')}]`
    }

}

