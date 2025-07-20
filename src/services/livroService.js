// A URL base da nossa API Java.
const API_URL = 'http://localhost:8080/api/livros';

// Função para buscar todos os livros
export const carregarLivros = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        return await response.json();
    } catch (error) {
        console.error("Falha na comunicação com o backend:", error);
        return [];
    }
};

// --- NOVAS FUNÇÕES ---

// Função para EXCLUIR um livro pelo seu ID
export const excluirLivro = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir o livro');
        }
        return true; // Retorna sucesso
    } catch (error) {
        console.error("Falha ao excluir o livro:", error);
        return false; // Retorna falha
    }
};

// Função para ADICIONAR um novo livro
export const adicionarLivro = async (livro) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar o livro');
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao adicionar o livro:", error);
        return null;
    }
};

// Função para ATUALIZAR um livro existente
export const atualizarLivro = async (id, livro) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar o livro');
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao atualizar o livro:", error);
        return null;
    }
};