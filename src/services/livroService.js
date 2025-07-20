// A URL base da nossa API Java. O Spring Boot por padrão roda na porta 8080.
const API_URL = 'http://localhost:8080/api/livros';

// Função para buscar todos os livros
export const carregarLivros = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Falha na comunicação com o backend:", error);
        return []; // Retorna uma lista vazia em caso de erro
    }
};

// Futuramente, adicionaremos aqui as funções para adicionar, editar e excluir.