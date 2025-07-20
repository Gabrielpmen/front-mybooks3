import React, { useState, useEffect } from 'react';
import { adicionarLivro, atualizarLivro } from '../services/livroService';

// Este componente recebe duas "props" (propriedades):
// 1. voltarParaConsulta: uma função para notificar o App.jsx que queremos voltar para a lista.
// 2. livroParaEditar: o objeto do livro, caso estejamos no modo de edição.
function FormularioLivro({ voltarParaConsulta, livroParaEditar }) {

    // Um único estado para guardar todos os dados do formulário
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        genero: '',
        midia: '',
        anoLancamento: '',
        statusLeitura: '',
        anoCompra: '',
        valorPago: 0.0,
        esaga: 'Não'
    });

    const modoEdicao = !!livroParaEditar; // Converte o objeto em true/false para saber se estamos editando

    // useEffect para preencher o formulário se estivermos no modo de edição
    useEffect(() => {
        if (modoEdicao) {
            setFormData({
                ...livroParaEditar,
                esaga: livroParaEditar.esaga === 'Sim' ? 'Sim' : 'Não' // Garante que o valor seja 'Sim' ou 'Não'
            });
        }
    }, [livroParaEditar, modoEdicao]);

    // Função para lidar com mudanças em qualquer campo do formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevState => ({ ...prevState, esaga: checked ? 'Sim' : 'Não' }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    // Função chamada ao enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Validação simples
        if (!formData.titulo || !formData.autor) {
            alert('Título e Autor são obrigatórios.');
            return;
        }

        if (modoEdicao) {
            // Lógica de ATUALIZAR
            const livroAtualizado = await atualizarLivro(livroParaEditar.id, formData);
            if (livroAtualizado) {
                alert('Livro atualizado com sucesso!');
                voltarParaConsulta(); // Volta para a tela de consulta
            } else {
                alert('Falha ao atualizar o livro.');
            }
        } else {
            // Lógica de ADICIONAR
            const novoLivro = await adicionarLivro(formData);
            if (novoLivro) {
                alert('Livro adicionado com sucesso!');
                voltarParaConsulta(); // Volta para a tela de consulta
            } else {
                alert('Falha ao adicionar o livro.');
            }
        }
    };

    return (
        <div className="formulario-container">
            <h1>{modoEdicao ? 'Editar Livro' : 'Adicionar Novo Livro'}</h1>
            <form onSubmit={handleSubmit}>
                {/* Título e Autor */}
                <div className="form-row">
                    <div className="form-group full-width">
                        <label>Título</label>
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group full-width">
                        <label>Autor</label>
                        <input type="text" name="autor" value={formData.autor} onChange={handleChange} required />
                    </div>
                </div>

                {/* Gênero e Mídia */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Gênero</label>
                        <select name="genero" value={formData.genero} onChange={handleChange}>
                            <option value="">Selecione...</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Thriller e Suspense">Thriller e Suspense</option>
                             {/* Adicione outros gêneros aqui */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mídia</label>
                        <select name="midia" value={formData.midia} onChange={handleChange}>
                            <option value="">Selecione...</option>
                            <option value="Física">Física</option>
                            <option value="Digital">Digital</option>
                        </select>
                    </div>
                </div>

                {/* Outros campos... (adicionar conforme necessário) */}

                <div className="form-row">
                    <div className="form-group">
                        <label>Valor Pago (R$)</label>
                        <input type="number" step="0.01" name="valorPago" value={formData.valorPago} onChange={handleChange} />
                    </div>
                    <div className="form-group checkbox">
                        <input type="checkbox" name="esaga" checked={formData.esaga === 'Sim'} onChange={handleChange} />
                        <label>Faz parte de uma saga?</label>
                    </div>
                </div>

                <div className="botoes-formulario">
                    <button type="submit" className="btn-salvar">{modoEdicao ? 'Salvar Alterações' : 'Adicionar Livro'}</button>
                    <button type="button" className="btn-cancelar" onClick={voltarParaConsulta}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioLivro;