import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

interface Compra {
    id: number;
    codigoCompra: string;
    nomeCliente: string;
    cpfCliente: string;
    nomeProdServ: string;
    codigoProdServ: string;
    valor: number;
    quantidade: number;
    tipoPet: string;
    racaPet: string;
    totalCompra: number;
}

const ListaConsumo: React.FC = () => {
    const [compras, setCompras] = useState<Compra[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [compraEditando, setCompraEditando] = useState<Compra | null>(null);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await api.get('/listaCompra');
                setCompras(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao obter compras:', error);
                setIsLoading(false);
            }
        };

        fetchCompras();
    }, []);

    const handleEditarCompra = (compra: Compra) => {
        setCompraEditando(compra);
    };

    const handleSalvarAlteracoes = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!compraEditando) return;

            const response = await api.put(`/editarCompra/${compraEditando.codigoCompra}`, compraEditando);
            console.log('Compra atualizada:', response.data);

            // Atualizar a lista de compras após a atualização
            const updatedCompras = compras.map(compra => {
                if (compra.codigoCompra === compraEditando.codigoCompra) {
                    return response.data;
                }
                return compra;
            });
            setCompras(updatedCompras);
            setCompraEditando(null);
            // Evite recarregar a página com window.location.reload()
        } catch (error) {
            console.error('Erro ao atualizar compra:', error);
        }
    };

    const handleExcluirCompra = async (codigoCompra: string) => {
        try {
            await api.delete(`/excluirCompra/${codigoCompra}`);
            const updatedCompras = compras.filter(compra => compra.codigoCompra !== codigoCompra);
            setCompras(updatedCompras);
        } catch (error) {
            console.error('Erro ao excluir compra:', error);
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Compra
    ) => {
        const { value } = event.target;
        if (compraEditando) {
            setCompraEditando(prevState => ({
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
            {compraEditando ? (
                <div>
                    {/* Formulário de edição da compra */}
                    <h4>Editar Compra</h4>
                    <form onSubmit={handleSalvarAlteracoes}>
                        {/* Inputs para editar as informações da compra */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome cliente"
                            value={compraEditando.nomeCliente}
                            onChange={(event) => handleInputChange(event, 'nomeCliente')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="CPF Cliente"
                            value={compraEditando.cpfCliente}
                            onChange={(event) => handleInputChange(event, 'cpfCliente')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome Produto/Serviço"
                            value={compraEditando.nomeProdServ}
                            onChange={(event) => handleInputChange(event, 'nomeProdServ')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código Produto/Serviço"
                            value={compraEditando.codigoProdServ}
                            onChange={(event) => handleInputChange(event, 'codigoProdServ')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Valor"
                            value={compraEditando.valor}
                            onChange={(event) => handleInputChange(event, 'valor')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Quantidade"
                            value={compraEditando.quantidade}
                            onChange={(event) => handleInputChange(event, 'quantidade')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tipo Pet"
                            value={compraEditando.tipoPet}
                            onChange={(event) => handleInputChange(event, 'tipoPet')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Raça Pet"
                            value={compraEditando.racaPet}
                            onChange={(event) => handleInputChange(event, 'racaPet')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Total Compra"
                            value={compraEditando.totalCompra}
                            onChange={(event) => handleInputChange(event, 'totalCompra')}
                        />
                        <p />
                        <button type="submit" className="btn btn-primary">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    {/* Lista de compras */}
                    <div className="list-group">
                        {compras.map(compra => (
                            <div key={compra.id} className="list-group-item list-group-item-action">
                                <p className='col'>Cliente: {compra.nomeCliente}</p>
                                <p className='col'>Produto/Serviço: {compra.nomeProdServ}</p>
                                <p className='col'>Valor Total: {compra.totalCompra}</p>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleEditarCompra(compra)}>Editar</button>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleExcluirCompra(compra.codigoCompra)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaConsumo;
