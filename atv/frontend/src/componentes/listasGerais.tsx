import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface ClienteQuantidade {
    nomeCliente: string;
    quantidade: number;
}

interface ProdutoServico {
    nomeProdServ: string;
    quantidade: number;
}

interface ConsumoTipoERaca {
    tipoPet: string;
    racaPet: string;
    nomeProdServ: string;
    quantidade: number;
}

interface ClienteValor {
    nomeCliente: string;
    totalCompra: number;
}

export default function ListasGerais(props: any) {
    const [topClientesQuantidade, setTopClientesQuantidade] = useState<ClienteQuantidade[]>([]);
    const [produtosServicos, setProdutosServicos] = useState<ProdutoServico[]>([]);
    const [consumoPorTipoERaca, setConsumoPorTipoERaca] = useState<ConsumoTipoERaca[]>([]);
    const [topClientesValor, setTopClientesValor] = useState<ClienteValor[]>([]);

    useEffect(() => {
        fetchTopClientesQuantidade();
        fetchProdutosServicosMaisConsumidos();
        fetchConsumoPorTipoERaca();
        fetchTopClientesValor();
    }, []);

    const fetchTopClientesQuantidade = async () => {
        try {
            const response = await api.get('/compras/top-clientes-quantidade');
            setTopClientesQuantidade(response.data);
        } catch (error) {
            console.error("Erro ao buscar top clientes por quantidade:", error);
        }
    };

    const fetchProdutosServicosMaisConsumidos = async () => {
        try {
            const response = await api.get('/compras/produtos-servicos-mais-consumidos');
            setProdutosServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos e serviços mais consumidos:", error);
        }
    };

    const fetchConsumoPorTipoERaca = async () => {
        try {
            const response = await api.get('/compras/consumo-por-tipo-e-raca');
            setConsumoPorTipoERaca(response.data);
        } catch (error) {
            console.error("Erro ao buscar consumo por tipo e raça:", error);
        }
    };

    const fetchTopClientesValor = async () => {
        try {
            const response = await api.get('/compras/top-clientes-valor');
            setTopClientesValor(response.data);
        } catch (error) {
            console.error("Erro ao buscar top clientes por valor:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className='row m-3'>
                <h5>Top 10 clientes que mais consumiram em quantidade</h5>
                <table style={{ width: 500, border: '1px solid black', borderCollapse: 'collapse' }}>
                    <thead style={{ border: '1px solid black' }}>
                        <tr style={{ border: '1px solid black' }}>
                            <th>Nome cliente</th>
                            <th style={{ border: '1px solid black' }}>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody style={{ border: '1px solid black' }}>
                        {topClientesQuantidade.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nomeCliente}</td>
                                <td>{cliente.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row m-3 mt-5'>
                <h5>Listagem geral de produtos e serviços mais consumidos</h5>
                <table style={{ width: 500, border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                    <thead style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        <tr>
                            <th>Nome</th>
                            <th style={{ borderColor: 'black', borderLeft: 1, borderStyle: 'solid' }}>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        {produtosServicos.map((produto, index) => (
                            <tr key={index}>
                                <td>{produto.nomeProdServ}</td>
                                <td>{produto.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row m-3 mt-5'>
                <h5>Listagem dos serviços e produtos mais consumidos por tipo e raça de pet</h5>
                <table style={{ width: 500, border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                    <thead style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        <tr>
                            <th>Tipo Pet</th>
                            <th style={{ borderColor: 'black', borderLeft: 1, borderStyle: 'solid' }}>Raça Pet</th>
                            <th style={{ borderColor: 'black', borderLeft: 1, borderStyle: 'solid' }}>Nome</th>
                            <th style={{ borderColor: 'black', borderLeft: 1, borderStyle: 'solid' }}>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        {consumoPorTipoERaca.map((consumo, index) => (
                            <tr key={index}>
                                <td>{consumo.tipoPet}</td>
                                <td>{consumo.racaPet}</td>
                                <td>{consumo.nomeProdServ}</td>
                                <td>{consumo.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row m-3 mt-5'>
                <h5>Top 5 clientes que mais consumiram em valor</h5>
                <table style={{ width: 500, border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                    <thead style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        <tr>
                            <th>Nome cliente</th>
                            <th style={{ borderColor: 'black', borderLeft: 1, borderStyle: 'solid' }}>Valor</th>
                        </tr>
                    </thead>
                    <tbody style={{ border: 1, borderColor: 'black', borderStyle: 'solid' }}>
                        {topClientesValor.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nomeCliente}</td>
                                <td>{cliente.totalCompra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
