import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface IPlayer {
  nome: string;
  saldo: number;
}

function App() {
  const initialMontant = 4500;
  const [players, setPlayers] = useState<IPlayer[]>([] as IPlayer[]);
  const [errorMessage, setErrorMessage] = useState({visible: true, message: ''});

  const handleAction = (e: any) => {
    const actionType = e.target.innerHTML as string;
    const valueTo = Number(e.target.parentNode.previousElementSibling.children[0].value);
    const name = e.target.parentNode.parentNode.id;
    const newPlayers = players.map(a => {
      if(a.nome === name && actionType === "Retirar") a.saldo = a.saldo-valueTo;
      if(a.nome === name && actionType === "Inserir") a.saldo = a.saldo+valueTo;
      return a
    });
    setPlayers(newPlayers);
  }
  const addNewPlayer = (e: any) => {
    const nome = e.target.previousSibling.value;
    if(!nome.length) setErrorMessage({visible: true, message:'Está em branco'});
    else if(players.filter(a => a.nome === nome).length) alert('Já existe');
    else setPlayers(prev => ([...prev, { nome, saldo: initialMontant }]));
  }
  useEffect(()=> {
    setTimeout(() => setErrorMessage({visible: false, message: ''}), 3000)
  }, [errorMessage])
  return (
    <div className="App">
      <div>
        <input className='add-input' type="text" />
        <button type='submit' onClick={addNewPlayer} className='add-button'>Novo</button>
        <p className="error-message">{errorMessage.message}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Saldo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.nome} id={p.nome}>
              <td>{p.nome}</td>
              <td>{p.saldo}</td>
              <td><input type="text" /></td>
              <td>
                <button className='r' onClick={handleAction}>Inserir</button>
                <button className='i' onClick={handleAction}>Retirar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
