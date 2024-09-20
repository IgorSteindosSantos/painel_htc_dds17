import { useEffect, useState } from 'react';
import styles from './LateralImagens.module.css'
import Loading
 from '../layout/Loading';
function LateralImagens() {
  const [imagens, seImagens] = useState([]);
  const [removeLoading ,setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      carregarImagens();
    }, 3000);
    
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
      setRemoveLoading(true)
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
      {!removeLoading && <Loading/>}
      {removeLoading && imagens.length === 0 && <h1>Não há aulas disponíveis</h1>}
    </div>
  );
}

export default LateralImagens;
