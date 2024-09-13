
function AbreviaAmbiente({ambiente}) {
    const partes = ambiente.split('-')
    partes.splice(0,2)
    return partes.splice(0,2).join('-') // Exibe a última parte do código do ambiente
}

export default AbreviaAmbiente