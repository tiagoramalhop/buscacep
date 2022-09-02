import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencher CEP!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch {
      alert("Ops erro ao buscar!");
      setInput("")
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className='containerInput'>
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>CEP:{cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Estado: {cep.uf}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Bairro: {cep.bairro}</span>

        </main>

      )}


    </div>
  );
}

export default App;
