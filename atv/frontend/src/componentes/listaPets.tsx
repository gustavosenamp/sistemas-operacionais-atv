import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

interface Pet {
    id: number;
    cpfDono: string;
    nomePet: string;
    tipo: string;
    raca: string;
    genero: string;
}

const ListaPets: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [petEditando, setPetEditando] = useState<Pet | null>(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await api.get('/listaPet');
                setPets(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao obter pets:', error);
                setIsLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleEditarPet = (pet: Pet) => {
        setPetEditando(pet);
    };

    const handleSalvarAlteracoes = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!petEditando) return;

            const response = await api.put(`/editarPet/${petEditando.nomePet}`, petEditando);
            console.log('Pet atualizado:', response.data);

            // Atualizar a lista de pets após a atualização
            const updatedPets = pets.map(pet => {
                if (pet.nomePet === petEditando.nomePet) {
                    return response.data;
                }
                return pet;
            });
            setPets(updatedPets);
            setPetEditando(null);
            // Evite recarregar a página com window.location.reload()
        } catch (error) {
            console.error('Erro ao atualizar pet:', error);
        }
    };

    const handleExcluirPet = async (nomePet: string) => {
        try {
            await api.delete(`/excluirPet/${nomePet}`);
            const updatedPets = pets.filter(pet => pet.nomePet !== nomePet);
            setPets(updatedPets);
        } catch (error) {
            console.error('Erro ao excluir pet:', error);
        }
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Pet
    ) => {
        const { value } = event.target;
        if (petEditando) {
            setPetEditando(prevState => ({
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
            {petEditando ? (
                <div>
                    {/* Formulário de edição do pet */}
                    <h4>Editar Pet</h4>
                    <form onSubmit={handleSalvarAlteracoes}>
                        {/* Inputs para editar as informações do pet */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="CPF do Dono"
                            value={petEditando.cpfDono}
                            onChange={(event) => handleInputChange(event, 'cpfDono')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Pet"
                            value={petEditando.nomePet}
                            onChange={(event) => handleInputChange(event, 'nomePet')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tipo"
                            value={petEditando.tipo}
                            onChange={(event) => handleInputChange(event, 'tipo')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Raça"
                            value={petEditando.raca}
                            onChange={(event) => handleInputChange(event, 'raca')}
                        />
                        <p />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Gênero"
                            value={petEditando.genero}
                            onChange={(event) => handleInputChange(event, 'genero')}
                        />
                        <p />
                        <button type="submit" className="btn btn-primary">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    {/* Lista de pets */}
                    <div className="list-group">
                        {pets.map(pet => (
                            <div key={pet.id} className="list-group-item list-group-item-action">
                                <p className='col'>CPF do Dono: {pet.cpfDono}</p>
                                <p className='col'>Nome do Pet: {pet.nomePet}</p>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleEditarPet(pet)}>Editar</button>

                                <button className='col m-2 btn btn-light'
                                    onClick={() => handleExcluirPet(pet.nomePet)}>Excluir</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaPets;
