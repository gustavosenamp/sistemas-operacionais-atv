import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

interface Produto {
    id: number;
    codigoProduto: string;
    nomeProduto: string;
    precoProduto: number;
}

const ListaProduto: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get('/listaProduto');
                setProdutos(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao obter produtos:', error);
                setIsLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleEditarProduto = (produto: Produto) => {
        setProdutoEditando(produto);
    };

    const handleSalvarAlteracoes = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!produtoEditando) return;

            const response = await api.put(`/editarProduto/${produtoEditando.codigoProduto}`, produtoEditando);
            console.log('Produto atualizado:', response.data);

            // Atualizar a lista de produtos após a atualização
            const updatedProdutos = produtos.map(produto => {
                if (produto.codigoProduto === produtoEditando.codigoProduto) {
                    return response.data;
                }
                return produto;
            });
            setProdutos(updatedProdutos);
            setProdutoEditando(null);
            // Evite recarregar a página com window.location.reload()
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const handleExcluirProduto = async (codigoProduto: string) => {
        try {
            await api.delete(`/excluirProduto/${codigoProduto}`);
            const updatedProdutos = produtos.filter(produto => produto.codigoProduto !== codigoProduto);
            setProdutos(updatedProdutos);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Produto
    ) => {
        const { value } = event.target;
        if (produtoEditando) {
            setProdutoEditando(prevState => ({
                ...prevState!,
                [field]: value
            }));
        }
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container-fluid">
            {produtoEditando ? (
                <div>
                    {/* Formulário de edição do produto */}
                    <h4>Editar Produto</h4>
                    <form onSubmit={handleSalvarAlteracoes}>
                        {/* Inputs para editar as informações do produto */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código"
                            value={produtoEditando.codigoProduto}
                            onChange={(event) => handleInputChange(event, 'codigoProduto')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={produtoEditando.nomeProduto}
                            onChange={(event) => handleInputChange(event, 'nomeProduto')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Preço"
                            value={produtoEditando.precoProduto}
                            onChange={(event) => handleInputChange(event, 'precoProduto')}
                        />
                        <p />
                        <button type="submit" className="btn btn-primary">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    {/* Lista de produtos */}
                    <div className="list-group">
                        {produtos.map(produto => (
                            <div key={produto.id} className="list-group-item list-group-item-action">
                                <p className='col'>Nome do produto: {produto.nomeProduto}</p>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleEditarProduto(produto)}>Editar</button>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleExcluirProduto(produto.codigoProduto)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaProduto;
