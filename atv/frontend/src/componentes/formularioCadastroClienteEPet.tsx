import React, { useState, useCallback } from 'react';
import api from '../services/api';

export default function FormularioCadastroClienteEPet(props: { tema: any; }) {
    let tema = props.tema

    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');

    const clienteSubmit = useCallback(async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!nome || !nomeSocial || !cpf || !rg || !telefone) {
            alert('Por favor, preencha todos os campos do cliente.');
            return;
        }
        try {
            const response = await api.post('/clientes', {
                nome, nomeSocial, cpf, rg, telefone 
            });
            console.log(response.data);
            alert('Cliente cadastrado com sucesso!');
        } catch (error: any) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Erro: Cliente já cadastrado!") {
                alert(error.response.data.error);
            } else {
                console.error(error);
                alert('Erro ao cadastrar cliente.');
            }
        }
    }, [nome, nomeSocial, cpf, rg, telefone])
    
    const [cpfDono, setCpfDono] = useState('');
    const [nomePet, setNomePet] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [genero, setGenero] = useState('');

    const petSubmit = useCallback(async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!cpfDono || !nomePet || !tipo || !raca || !genero) {
            alert('Por favor, preencha todos os campos do pet.');
            return;
        }
        try {
            const response = await api.post('/pets', {
                cpfDono, nomePet, tipo, raca, genero 
            });
            console.log(response.data);
            alert('Pet cadastrado com sucesso!');
        } catch (error: any) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Erro: Pet já cadastrado!") {
                alert(error.response.data.error);
            } else {
                console.error(error);
                alert('Erro ao cadastrar pet.');
            }
        }
    }, [cpfDono, nomePet, tipo, raca, genero])

    return (
        <div className="container-fluid">
            <form>
                <h4>Informações do cliente:</h4>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome" 
                        aria-label="Nome" 
                        aria-describedby="basic-addon1" 
                        onChange={event => setNome(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome social" 
                        aria-label="Nome social" 
                        aria-describedby="basic-addon1"
                        onChange={event => setNomeSocial(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="CPF" 
                        aria-label="CPF" 
                        aria-describedby="basic-addon1"
                        onChange={event => setCpf(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="RG" aria-label="RG" 
                        aria-describedby="basic-addon1"
                        onChange={event => setRg(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Telefone" 
                        aria-label="Telefone" 
                        aria-describedby="basic-addon1"
                        onChange={event => setTelefone(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={clienteSubmit}
                        style={{ background: tema }}>Cadastrar Cliente</button>
                </div>

                <h4>Pets:</h4>
                <div className="input-group mb-3">
                    <input type="text" 
                    className="form-control" 
                    placeholder="CPF do dono" 
                    aria-label="CPF do dono" 
                    aria-describedby="basic-addon1"
                    onChange={event => setCpfDono(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome do PET" 
                        aria-label="Nome do PET" 
                        aria-describedby="basic-addon1"
                        onChange={event => setNomePet(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tipo" 
                    aria-label="Tipo" 
                    aria-describedby="basic-addon1"
                    onChange={event => setTipo(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Raça" 
                        aria-label="Raça" 
                        aria-describedby="basic-addon1"
                        onChange={event => setRaca(event.target.value)}/>

                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Gênero" 
                        aria-label="Gênero" 
                        aria-describedby="basic-addon1"
                        onChange={event => setGenero(event.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={petSubmit}
                        style={{ background: tema }}>Cadastrar Pet</button>
                </div>
            </form>
        </div>
    )
}