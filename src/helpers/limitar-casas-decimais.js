// @ts-check

/**
* 
* @param {number} valor 
* @param {number} quantidadeCasasDecimais 
* @returns 
*/
export function limitarCasasDecimais(valor, quantidadeCasasDecimais) {
    const multiplicador = Math.pow(10, quantidadeCasasDecimais);
    const bruto = Math.round(valor * multiplicador);
    const valorLimpo = bruto / multiplicador;
    return valorLimpo;
}