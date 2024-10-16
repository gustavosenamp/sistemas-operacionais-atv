import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

interface Servico {
    id: number;
    codigoServico: string;
    nomeServico: string;
    precoServico: number;
}

const ListaServico: React.FC = () => {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await api.get('/listaServico');
                setServicos(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao obter serviços:', error);
                setIsLoading(false);
            }
        };

        fetchServicos();
    }, []);

    const handleEditarServico = (servico: Servico) => {
        setServicoEditando(servico);
    };

    const handleSalvarAlteracoes = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!servicoEditando) return;

            const response = await api.put(`/editarServico/${servicoEditando.codigoServico}`, servicoEditando);
            console.log('Serviço atualizado:', response.data);

            // Atualizar a lista de serviços após a atualização
            const updatedServicos = servicos.map(servico => {
                if (servico.codigoServico === servicoEditando.codigoServico) {
                    return response.data;
                }
                return servico;
            });
            setServicos(updatedServicos);
            setServicoEditando(null);
            // Evite recarregar a página com window.location.reload()
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
        }
    };

    const handleExcluirServico = async (codigoServico: string) => {
        try {
            await api.delete(`/excluirServico/${codigoServico}`);
            const updatedServicos = servicos.filter(servico => servico.codigoServico !== codigoServico);
            setServicos(updatedServicos);
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Servico
    ) => {
        const { value } = event.target;
        if (servicoEditando) {
            setServicoEditando(prevState => ({
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
            {servicoEditando ? (
                <div>
                    {/* Formulário de edição do serviço */}
                    <h4>Editar Serviço</h4>
                    <form onSubmit={handleSalvarAlteracoes}>
                        {/* Inputs para editar as informações do serviço */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código"
                            value={servicoEditando.codigoServico}
                            onChange={(event) => handleInputChange(event, 'codigoServico')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={servicoEditando.nomeServico}
                            onChange={(event) => handleInputChange(event, 'nomeServico')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Preço"
                            value={servicoEditando.precoServico}
                            onChange={(event) => handleInputChange(event, 'precoServico')}
                        />
                        <p />
                        <button type="submit" className="btn btn-primary">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    {/* Lista de serviços */}
                    <div className="list-group">
                        {servicos.map(servico => (
                            <div key={servico.id} className="list-group-item list-group-item-action">
                                <p className='col'>Nome do serviço: {servico.nomeServico}</p>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleEditarServico(servico)}>Editar</button>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleExcluirServico(servico.codigoServico)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaServico;
