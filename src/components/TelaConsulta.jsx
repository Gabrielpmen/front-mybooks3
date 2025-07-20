import React, { useState, useEffect } from 'react';
import { carregarLivros } from '../services/livroService';

function TelaConsulta() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const buscarDados = async () => {
            console.log("Buscando dados da API..."); // Log 1: Para ver se o efeito está rodando
            const dados = await carregarLivros();
            
            console.log("Dados recebidos da API:", dados); // Log 2: Para ver o que a API retornou
            setLivros(dados);
        };

        buscarDados();
    }, []);

    console.log("Renderizando componente com os livros:", livros); // Log 3: Para ver o estado atual

    return (
        <div>
            <h1>Consultar Livros</h1>
            
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th>Mídia</th>
                        <th>Ano Lançamento</th>
                    </tr>
                </thead>
                <tbody>
                    {/* --- MUDANÇA: Lógica para exibir mensagem de lista vazia --- */}
                    {livros.length > 0 ? (
                        // Se a lista de livros NÃO estiver vazia, mostra os livros
                        livros.map(livro => (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.genero}</td>
                                <td>{livro.midia}</td>
                                <td>{livro.anoLancamento}</td>
                            </tr>
                        ))
                    ) : (
                        // Se a lista de livros ESTIVER vazia, mostra esta mensagem
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
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