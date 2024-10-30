export class Aluno {
    #matricula;
    #nome;
    #p1;
    #p2;

    get matricula() { return this.#matricula; }
    get nome() { return this.#nome; }
    get p1() { return this.#p1; }
    get p2() { return this.#p2; }

    /**
     * 
     * @param {string} matricula 
     * @param {string} nome 
     * @param {number | null} p1 
     * @param {number | null} p2 
     */
    constructor(matricula, nome, p1, p2) {
        this.#matricula = matricula;
        this.#nome = nome;
        this.#p1 = p1;
        this.#p2 = p2;
    }

    getNF() {
        const p1 = this.p1 ?? 0;
        const p2 = this.p2 ?? 0;
        return (p1 + p2) / 2;
    }
}