// @ts-check
import { IO } from './helpers/io.js';
import { DateTime, Interval } from "luxon";

class Questao5 {
    #io;

    constructor() {
        this.#io = new IO();
    }

    rodar() {
        this.#io.escreve('Questão 5');
        this.#io.escreve('Informe os dados do cliente');

        const nome = this.#io.lerString('Nome: ', { minLength: 5 });
        const cpf = this.#io.lerString('CPF: ', { minLength: 11, maxLength: 11, apenasNumeros: true });
        const dataDeNascimento = this.#getDataDeNascimento();
        const rendaMensal = this.#getRendaMensal();
        const estadoCivil = this.#io.lerOpcao('Estado Civil (C, S, V ou D): ', ['C', 'S', 'V', 'D', 'c', 's', 'v', 'd']);
        const dependentes = this.#io.lerInt('Dependentes: ', { min: 0, max: 10 });

        this.#io.escreve('\n---- Dados Informados ----');
        this.#io.escreve(`Nome: ${nome}`);
        this.#io.escreve(`CPF: ${this.#formatarCpf(cpf)}`);
        this.#io.escreve(`Data de Nascimento: ${this.#formatarData(dataDeNascimento)}`);
        this.#io.escreve(`Renda Mensal: ${this.#formatarReal(rendaMensal)}`);
        this.#io.escreve(`Estado Civil: ${estadoCivil}`);
        this.#io.escreve(`Dependentes: ${dependentes}`);
        this.#io.escreve('');
        this.#io.pause();
    }

    #getDataDeNascimento() {
        while (true) {
            const dataDeNascimento = this.#io.lerData('Data de Nascimento: ');
            const d = Interval.fromDateTimes(
                DateTime.fromJSDate(dataDeNascimento).startOf('day'),
                DateTime.now().startOf('day')
            );
            const idade = d.length('years');
            if (idade < 18) {
                console.log('Erro: o cliente deve ter no mínimo 18 anos de idade.');
                continue;
            }
            return dataDeNascimento;
        }
    }

    #getRendaMensal() {
        const regex = /^\d+,\d{2}$/
        while (true) {
            const resposta = this.#io.lerString('Renda mensal: ');
            if (!regex.test(resposta)) {
                console.log('Erro: formáto inválido. O valor deve ter obrigatoriamente 2 casa decimais. Use vígula como separador decimal.');
                continue;
            }
            const valorStr = resposta.replace(',', '.');
            const valor = Number(valorStr);
            if (valor === 0) {
                console.log('Erro: O valor deve ser maior que zero.');
                continue;
            }

            return valor;
        }
    }

    /**
     * 
     * @param {string} cpf 
     */
    #formatarCpf(cpf) {
        if (cpf.length !== 11) {
            return cpf;
        }

        const parte1 = cpf.substring(0, 3);
        const parte2 = cpf.substring(3, 6);
        const parte3 = cpf.substring(6, 9);
        const digitosVerificadores = cpf.substring(9, 11);

        const cpfFormatado = `${parte1}.${parte2}.${parte3}-${digitosVerificadores}`;
        return cpfFormatado
    }

    /**
     * 
     * @param {Date} data 
     */
    #formatarData(data) {
        const d = DateTime.fromJSDate(data);
        return d.toUTC().toFormat('dd/MM/yyyy');
    }

    /**
     * @param {number} valor
     */
    #formatarReal(valor) {
        return valor.toFixed(2).replace('.', ',');
    }


}


const questao5 = new Questao5()

questao5.rodar()

export { }