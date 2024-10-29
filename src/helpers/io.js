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
        const texto = this.#input(pergunta)
        return texto
    }

    /**
     * @param {string} pergunta
     * @returns {number}
     */
    lerNumber(pergunta) {
        while (true) {
            const texto = this.lerString(pergunta)
            const num = Number(texto)
            if (isNaN(num)) {
                this.escreve(`ERRO: o valor informado "${texto}" não é um número válido. Tente novamente.`);
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
        this.lerString('Aperte ENTER para continuar ...')
    }
}