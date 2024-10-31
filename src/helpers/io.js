// @ts-check

import PromptSync from 'prompt-sync';
export class IO {

    /** @type {PromptSync.Prompt} */ #input;

    constructor() {
        this.#input = PromptSync();
    }

    /**
     * @param {string} pergunta
     * @returns {string}
     */
    lerString(pergunta) {
        while (true) {
            const texto = this.#input(pergunta)
            if (texto !== "") {
                return texto
            }
        }
    }

    /**
     * @param {string} pergunta
     * @param {{min?: number, max?: number}=} opcoes 
     * @returns {number}
     */
    lerNumber(pergunta, opcoes) {
        while (true) {
            const texto = this.lerString(pergunta)
            const num = Number(texto)
            if (isNaN(num)) {
                this.escreve(`ERRO: o valor informado "${texto}" não é um número válido. Tente novamente.`);
                continue;
            }
            if (opcoes?.min !== undefined && num < opcoes.min) {
                this.escreve(`ERRO: o valor informado é menor que o mínimo permitido`);
                continue;
            }
            if (opcoes?.max !== undefined && num > opcoes.max) {
                this.escreve(`ERRO: o valor informado é maior que o máximo permitido`);
                continue;
            }
            return num;
        }
    }

    /**
     * @param {string} pergunta
     * @param {string[]} opcoes 
     * @returns {string}
     */
    lerOpcao(pergunta, opcoes) {
        while (true) {
            const opcaoSelecionada = this.lerString(pergunta)
            if (!opcoes.includes(opcaoSelecionada)) {
                this.escreve(`ERRO: opção "${opcaoSelecionada}" inválida. Tente novamente.`)
                continue;
            }
            return opcaoSelecionada
        }
    }

    /**
     * @param {string} msg 
     */
    escreve(msg) {
        console.log(msg)
    }

    pause() {
        this.#input('Aperte ENTER para continuar ...')
    }
}