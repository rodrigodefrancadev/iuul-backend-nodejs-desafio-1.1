export class Vertice {
    /** @type number */ #x
    /** @type number */ #y

    /**
     * @param {number} x
     * @param {number} y  
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    /**
     * @param {Vertice} outroVertice 
    */
    distanciaAte(outroVertice) {
        const diffX = this.x - outroVertice.x
        const diffY = this.y - outroVertice.y
        const distancia = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
        return distancia
    }

    /**
     * @param {number} x
     * @param {number} y  
     */
    move(x, y) {
        this.#x = x
        this.#y = y
    }

    /**
     * @param {Vertice} outroVertice 
    */
    equals(outroVertice) {
        return this.x === outroVertice.x && this.y === outroVertice.y
    }

}