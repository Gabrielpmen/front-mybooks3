import React, { useState } from 'react';
import './App.css';
import TelaConsulta from './components/TelaConsulta';
import FormularioLivro from './components/FormularioLivro';

function App() {
  // Estado para controlar a tela atual ('consulta' ou 'formulario')
  const [tela, setTela] = useState('consulta'); 
  // Estado para guardar o livro que será editado
  const [livroParaEditar, setLivroParaEditar] = useState(null);

  // Função para navegar para a tela de formulário em modo de ADIÇÃO
  const mostrarFormularioAdicionar = () => {
    setLivroParaEditar(null); // Garante que não há livro para editar
    setTela('formulario');
  };

  // Função para navegar para a tela de formulário em modo de EDIÇÃO
  const mostrarFormularioEditar = (livro) => {
    setLivroParaEditar(livro); // Guarda o livro selecionado
    setTela('formulario');
  };

  // Função para voltar para a tela de consulta
  const mostrarTelaConsulta = () => {
    setTela('consulta');
  };

  return (
    <div className="App">
      {/* Renderização Condicional: exibe uma tela ou outra com base no estado */}
      {tela === 'consulta' ? (
        <TelaConsulta 
          onAdicionar={mostrarFormularioAdicionar} 
          onEditar={mostrarFormularioEditar} 
        />
      ) : (
        <FormularioLivro 
          voltarParaConsulta={mostrarTelaConsulta}
          livroParaEditar={livroParaEditar}
        />
      )}
    </div>
  );
}

export default App;