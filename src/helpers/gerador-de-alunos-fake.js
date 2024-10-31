import { fakerPT_BR as faker } from '@faker-js/faker';
import { Aluno } from "../entidades/aluno.js";

export class GeradorDeAlunosFake {

    /**
     * 
     * @param {number} quantidade
     * @returns {Aluno[]} 
     */
    static gerar(quantidade) {
        const alunos = Array(quantidade).fill(0).map((_, i) => {
            const matricula = (i + 1).toString().padStart(4, '0');
            const nome = faker.person.fullName();
            const p1 = GeradorDeAlunosFake.#gerarNotaAleatoriaOuNula();
            const p2 = GeradorDeAlunosFake.#gerarNotaAleatoriaOuNula();
            return new Aluno(matricula, nome, p1, p2);
        })
    }

    static #gerarNotaAleatoriaOuNula() {
        return Math.random() > 0.5 ? faker.number.float({ min: 0, max: 10, fractionDigits: 1 }) : null;
    }
}