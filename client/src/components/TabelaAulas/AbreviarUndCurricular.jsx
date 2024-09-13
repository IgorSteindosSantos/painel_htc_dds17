
function AbreviarUndCurricular({unidadeCurricular}) {
    let pieces = unidadeCurricular.split(' ')
    pieces.splice(-2, 2) // Remove o "CH: 219.000" ou partes similares

    let abrevPrimeira = pieces[0].substring(0, 4) // Pega os primeiros 4 caracteres da primeira palavra
    let ultimaPalavra = pieces.pop() // Pega a última palavra restante

    return `${abrevPrimeira}. ${ultimaPalavra}.` // Retorna a abreviação
}

export default AbreviarUndCurricular