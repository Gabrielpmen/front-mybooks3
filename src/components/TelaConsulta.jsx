import React, { useState, useEffect } from 'react';
import { carregarLivros, excluirLivro } from '../services/livroService';

// O componente agora recebe as funções de navegação como props do App.jsx
function TelaConsulta({ onAdicionar, onEditar }) {
    // Estados do Componente
    const [listaMestraLivros, setListaMestraLivros] = useState([]);
    const [livrosExibidos, setLivrosExibidos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Estados para cada campo de filtro
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroAutor, setFiltroAutor] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('');
    const [filtroMidia, setFiltroMidia] = useState('');

    // Efeito para buscar os dados da API apenas uma vez
    const buscarDadosIniciais = async () => {
        setCarregando(true);
        const dados = await carregarLivros();
        setListaMestraLivros(dados);
        setLivrosExibidos(dados);
        setCarregando(false);
    };

    useEffect(() => {
        buscarDadosIniciais();
    }, []);

    // Lógica dos Botões de Filtro
    const handlePesquisar = () => {
        let listaFiltrada = [...listaMestraLivros];

        if (filtroTitulo) {
            listaFiltrada = listaFiltrada.filter(livro =>
                livro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
            );
        }
        if (filtroAutor) {
            listaFiltrada = listaFiltrada.filter(livro =>
                livro.autor.toLowerCase().includes(filtroAutor.toLowerCase())
            );
        }
        if (filtroGenero) {
            listaFiltrada = listaFiltrada.filter(livro => livro.genero === filtroGenero);
        }
        if (filtroMidia) {
            listaFiltrada = listaFiltrada.filter(livro => livro.midia === filtroMidia);
        }

        setLivrosExibidos(listaFiltrada);
    };

    const handleLimparFiltros = () => {
        setFiltroTitulo('');
        setFiltroAutor('');
        setFiltroGenero('');
        setFiltroMidia('');
        setLivrosExibidos([...listaMestraLivros]);
    };

    // Lógica dos Botões de Ação da Tabela
    const handleExcluir = async (id, titulo) => {
        if (window.confirm(`Tem certeza que deseja excluir o livro "${titulo}"?`)) {
            const sucesso = await excluirLivro(id);
            if (sucesso) {
                alert('Livro excluído com sucesso!');
                // Atualiza a lista na tela sem precisar chamar a API novamente
                const novaListaMestra = listaMestraLivros.filter(livro => livro.id !== id);
                setListaMestraLivros(novaListaMestra);
                setLivrosExibidos(novaListaMestra);
            } else {
                alert('Falha ao excluir o livro.');
            }
        }
    };

    const handleEditar = (livro) => {
        // Em vez de um alerta, agora chama a função do App.jsx para trocar de tela
        onEditar(livro);
    };

    if (carregando) {
        return <div><h1>Consultar Livros</h1><p>Carregando livros...</p></div>;
    }

    return (
        <div className="tela-consulta-container">
            <div className="header-consulta">
                <h1>Consultar Livros</h1>
                {/* NOVO BOTÃO PARA ADICIONAR LIVRO */}
                <button className="btn-adicionar" onClick={onAdicionar}>Adicionar Novo Livro</button>
            </div>

            <div className="filtros-container">
                <div className="filtro-item">
                    <label>Título:</label>
                    <input
                        type="text"
                        value={filtroTitulo}
                        onChange={(e) => setFiltroTitulo(e.target.value)}
                    />
                </div>
                <div className="filtro-item">
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={filtroAutor}
                        onChange={(e) => setFiltroAutor(e.target.value)}
                    />
                </div>
                <div className="filtro-item">
                    <label>Gênero:</label>
                    <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller e Suspense">Thriller e Suspense</option>
                        {/* Adicione outros gêneros aqui */}
                    </select>
                </div>
                <div className="filtro-item">
                    <label>Mídia:</label>
                    <select value={filtroMidia} onChange={(e) => setFiltroMidia(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="Física">Física</option>
                        <option value="Digital">Digital</option>
                    </select>
                </div>
                <div className="botoes-filtro">
                    <button onClick={handlePesquisar}>Pesquisar</button>
                    <button onClick={handleLimparFiltros}>Limpar Filtros</button>
                </div>
            </div>

            <table className="tabela-livros">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th style={{ width: '180px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livrosExibidos.length > 0 ? (
                        livrosExibidos.map(livro => (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.genero}</td>
                                <td>
                                    <div className="botoes-acao">
                                        {/* Passa o objeto livro inteiro para a função de editar */}
                                        <button className="btn-editar" onClick={() => handleEditar(livro)}>Editar</button>
                                        <button className="btn-excluir" onClick={() => handleExcluir(livro.id, livro.titulo)}>Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                                Nenhum livro encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TelaConsulta;