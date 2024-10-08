function AbreviarUndCurricular({ unidadeCurricular }) {
  let pieces = unidadeCurricular.split(' ');
  pieces.splice(-2, 2); // Remove o "CH: 219.000" ou partes similares

  let abrevPrimeira = pieces[0].substring(0, 4); // Pega os primeiros 4 caracteres da primeira palavra
  let ultimaPalavra = pieces.pop(); // Pega a última palavra restante

  return `${abrevPrimeira}. ${ultimaPalavra}.`; // Retorna a abreviação
}

export default AbreviarUndCurricular;

// function AbreviarUndCurricular(props) {
//   const unidade = props.unidade_curricular.split(' ');
//   if (unidade.length === 1) {
//       return unidade[0]
//   }
//   unidade.splice(-2, 2);
//   const abrev = unidade[0].substring(0,4);
  
//   return (
//       abrev+'. '+ unidade.pop()
//   )
// }

// export default AbreviarUndCurricular
