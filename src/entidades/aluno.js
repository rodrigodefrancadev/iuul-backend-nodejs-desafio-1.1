// @ts-check

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
     * @param {(number | null)=} p1 
     * @param {(number | null)=} p2 
     */
    constructor(matricula, nome, p1 = null, p2 = null) {
        this.#matricula = matricula;
        this.#nome = nome;
        this.#p1 = p1;
        this.#p2 = p2;
    }

    /**
     * 
     * @param {'P1' | 'P2'} tipoDaNota 
     * @param {number} valorDaNota 
     */
    setNota(tipoDaNota, valorDaNota) {
        switch (tipoDaNota) {
            case "P1":
                if (this.p1 !== null) {
                    throw new Error('Erro: Nota P1 já foi definida para este aluno');
                }
                this.#p1 = valorDaNota;
                break;
            case "P2":
                if (this.p2 !== null) {
                    throw new Error('Erro: Nota P2 já foi definida para este aluno');
                }
                this.#p2 = valorDaNota;
                break;
            default:
                throw new Error(`Tipo de Nota ${tipoDaNota} é inválido`);
        }
    }

    getNF() {
        const p1 = this.p1 ?? 0;
        const p2 = this.p2 ?? 0;
        return (p1 + p2) / 2;
    }
}