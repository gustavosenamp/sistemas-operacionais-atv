import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    rg: string;
    telefone: string;
}

const ListaClientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/listaCliente');
                setClientes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao obter clientes:', error);
                setIsLoading(false);
            }
        };

        fetchClientes();
    }, []);

    const handleEditarCliente = (cliente: Cliente) => {
        setClienteEditando(cliente);
    };

    const handleSalvarAlteracoes = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!clienteEditando) return;

            const response = await api.put(`/editarCliente/${clienteEditando.cpf}`, clienteEditando);
            console.log('Cliente atualizado:', response.data);

            // Atualizar a lista de clientes após a atualização
            const updatedClientes = clientes.map(cliente => {
                if (cliente.cpf === clienteEditando.cpf) {
                    return response.data;
                }
                return cliente;
            });
            setClientes(updatedClientes);
            setClienteEditando(null);
            // Não é recomendado usar window.location.reload() aqui para atualizações parciais de dados
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    };

    const handleExcluirCliente = async (cpf: string) => {
        try {
            await api.delete(`/excluirCliente/${cpf}`);
            const updatedClientes = clientes.filter(cliente => cliente.cpf !== cpf);
            setClientes(updatedClientes);
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Cliente
    ) => {
        const { value } = event.target;
        if (clienteEditando) {
            setClienteEditando(prevState => ({
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
            {clienteEditando ? (
                <div>
                    {/* Formulário de edição do cliente */}
                    <h4>Editar Cliente</h4>
                    <form onSubmit={handleSalvarAlteracoes}>
                        {/* Inputs para editar as informações do cliente */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={clienteEditando.nome}
                            onChange={(event) => handleInputChange(event, 'nome')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome Social"
                            value={clienteEditando.nomeSocial}
                            onChange={(event) => handleInputChange(event, 'nomeSocial')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cpf"
                            value={clienteEditando.cpf}
                            onChange={(event) => handleInputChange(event, 'cpf')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="rg"
                            value={clienteEditando.rg}
                            onChange={(event) => handleInputChange(event, 'rg')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="telefone"
                            value={clienteEditando.telefone}
                            onChange={(event) => handleInputChange(event, 'telefone')}
                        />
                        <p />
                        <button type="submit" className="btn btn-primary">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    {/* Lista de clientes */}
                    <div className="list-group">
                        {clientes.map(cliente => (
                            <div key={cliente.id} className="list-group-item list-group-item-action">
                                <p className='col'>Nome: {cliente.nome}</p>
                                <p className='col'>CPF: {cliente.cpf}</p>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleEditarCliente(cliente)}>Editar</button>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleExcluirCliente(cliente.cpf)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaClientes;
