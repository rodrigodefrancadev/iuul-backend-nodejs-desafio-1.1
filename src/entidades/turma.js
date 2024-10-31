// @ts-check

import { Aluno } from "./aluno";

export class Turma {
    /** @type {Aluno[]} */
    #alunos;

    constructor() {
        this.#alunos = [];
    }

    /**
     * 
     * @param {Aluno} aluno 
     */
    inserirAluno(aluno) {
        if (this.buscaAlunoPelaMatricula(aluno.matricula)) {
            throw new Error('Já existe um aluno com esta matrícula');
        }
        this.#alunos.push(aluno);
        this.#ordenaAlunosEmOrdemAlfabetica();
    }

    #ordenaAlunosEmOrdemAlfabetica() {
        this.#alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    /**
     * 
     * @param {string} matricula 
     * @returns 
     */
    buscaAlunoPelaMatricula(matricula) {
        const aluno = this.#alunos.find(a => a.matricula === matricula);
        return aluno
    }

    /**
     * 
     * @param {string} matricula 
     * @returns {Aluno} aluno removido
     */
    removeAlunoPelaMatricula(matricula) {
        const index = this.#alunos.findIndex(c => c.matricula === matricula);
        if (index === -1) {
            throw new Error(`Erro: aluno não encontrado com a matrícula ${matricula}`);
        }
        const [alunoRemovido] = this.#alunos.splice(index, 1);
        return alunoRemovido;
    }

    /**
     * 
     * @param {string} matricula 
     * @param {'P1' | 'P2'} tipoDaNota 
     * @param {number} valorDaNota 
     */
    lancarNota(matricula, tipoDaNota, valorDaNota) {
        const aluno = this.buscaAlunoPelaMatricula(matricula);
        if (!aluno) {
            throw new Error(`Aluno não encontrado com a matrícula ${matricula}`);
        }

        aluno.setNota(tipoDaNota, valorDaNota);
    }

    printTurma() {
        console.table(this.#alunos);
    }
}