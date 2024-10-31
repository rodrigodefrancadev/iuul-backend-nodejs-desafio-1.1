// @ts-check

import { GeradorDeAlunosFake } from './helpers/gerador-de-alunos-fake.js';
import { Table } from 'console-table-printer';
import { Aluno } from './entidades/aluno.js';
import { Turma } from './entidades/turma.js';
import { IO } from './helpers/io.js';

const QTD_ALUNOS_FAKE_INICIAIS = 7;

class Questao4 {
    #io;

    #turma;

    constructor() {
        this.#io = new IO();
        this.#turma = new Turma();
    }

    rodar() {
        this.#io.escreve('Questão 4')
        this.#rotinaInicializarTurma()
        this.#rodarLoopPrincipal();
    }

    #rotinaInicializarTurma() {
        const alunosFake = GeradorDeAlunosFake.gerar(QTD_ALUNOS_FAKE_INICIAIS);
        alunosFake.forEach((aluno => {
            this.#turma.inserirAluno(aluno);
        }));
    }

    #rodarLoopPrincipal() {
        while (true) {
            this.#printTurma()
            this.#io.escreve(`Escolha uma opção:`);
            this.#io.escreve(`\t 1 - Cadastrar aluno`);
            this.#io.escreve(`\t 2 - Remover aluno`);
            this.#io.escreve(`\t 3 - Lançar nota`);
            this.#io.escreve(`\t 0 - Encerrar programa`);
            const opcaoSelecionada = this.#io.lerOpcao('Opção Selecionada: ', ['1', '2', '3', '0']);

            try {
                switch (opcaoSelecionada) {
                    case '1':
                        this.#rotinaCadastrarAluno();
                        break;
                    case '2':
                        this.#rotinaRemoverAluno();
                        break;
                    case '3':
                        this.#rotinaLancarNota();
                        break;
                    case '0':
                        this.#io.escreve('Até mais 0/')
                        process.exit();
                }
            }
            catch (error) {
                console.log(error.message);
            }

            this.#io.pause()
        }
    }

    #printTurma() {
        this.#io.escreve('TURMA: ');
        const alunos = this.#turma.alunos;

        const table = new Table({
            columns: [
                { name: "Matrícula", alignment: "right" },
                { name: "Nome", alignment: "left" },
                { name: "P1", alignment: "center" },
                { name: "P2", alignment: "center" },
                { name: "NF", alignment: "center" },
            ]
        });

        alunos.forEach((aluno) => {
            table.addRow({
                Matrícula: aluno.matricula,
                Nome: aluno.nome,
                P1: aluno.p1?.toFixed(1).padStart(4, ' ') ?? '  - ',
                P2: aluno.p2?.toFixed(1).padStart(4, ' ') ?? '  - ',
                NF: aluno.getNF().toFixed(1).padStart(4, ' '),
            });
        })

        table.printTable();
        this.#io.escreve('--------------------------');
    }

    #rotinaCadastrarAluno() {
        this.#io.escreve('Cadastrando Aluno')
        const aluno = this.#criaAlunoComInputsDoUsuario();
        this.#turma.inserirAluno(aluno);
    }

    #criaAlunoComInputsDoUsuario() {
        const matricula = this.#io.lerString('Matrícula: ');
        const nome = this.#io.lerString('Nome: ');
        const aluno = new Aluno(matricula, nome);
        return aluno;
    }

    #rotinaRemoverAluno() {
        this.#io.escreve('Removendo Aluno')
        const matricula = this.#io.lerString('Matrícula do aluno: ');
        const alunoRemovido = this.#turma.removeAlunoPelaMatricula(matricula);
        this.#io.escreve(`Aluno ${alunoRemovido.nome} - ${alunoRemovido.matricula} removido da turma`);
    }

    #rotinaLancarNota() {
        this.#io.escreve('Lançando Nota Aluno')
        const matricula = this.#io.lerString('Matrícula do aluno: ');
        this.#io.escreve('Escolha o tipo de nota que quer lançar (P1 ou P2):');
        const tipoDeNota = /** @type {'P1' | 'P2'} */ (this.#io.lerOpcao('Tipo de Nota: ', ['P1', 'P2']));
        const valorDaNota = this.#io.lerNumber('Valor da Nota (de 0 a 10): ', { min: 0, max: 10 });
        this.#turma.lancarNota(matricula, tipoDeNota, valorDaNota);
        this.#io.escreve('Nota Lançada');
    }
}


const questao4 = new Questao4()

questao4.rodar()

export { }