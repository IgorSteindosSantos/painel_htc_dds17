import { useEffect, useState } from 'react';
import styles from './LateralImagens.module.css'
function LateralImagens() {
  const [imagens, seImagens] = useState([]);

  useEffect(() => {
    carregarImagens();
  }, []);

  async function carregarImagens() {
    try {
      const resposta = await fetch('http://localhost:5000/imagens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta) {
        throw new Error('Erro ao buscar imagens');
      }
      const consulta = await resposta.json();
      seImagens(consulta);
    } catch (error) {
      console.log('Erro ao consultar imagens', error);
    }
  }

  return (
    <div className={styles.lateral}>
      {imagens.map((imagem) => (
        <div key={imagem.id}>
          <img src={imagem.caminho} alt={imagem.alt} />
        </div>
      ))}
    </div>
  );
}

export default LateralImagens;
