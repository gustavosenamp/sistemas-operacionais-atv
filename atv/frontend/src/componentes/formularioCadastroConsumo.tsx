import React, { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

export default function FormularioCadastroConsumo(props: { tema: any; }) {
    let tema = props.tema;

    const [codigoCompra, setCodigoCompra] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [nomeProdServ, setNomeProdServ] = useState('');
    const [codigoProdServ, setCodigoProdServ] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipoPet, setTipoPet] = useState('');
    const [racaPet, setRacaPet] = useState('');
    const [totalCompra, setTotalCompra] = useState('');

    const consumoSubmit = useCallback(async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!codigoCompra || !nomeCliente || !cpfCliente || !nomeProdServ || !codigoProdServ || 
            !valor || !quantidade || !tipoPet || !racaPet || !totalCompra
        ) {
            alert('Por favor, preencha todos os campos da compra.');
            return;
        }
        try {
            const response = await api.post('/compras', {
                codigoCompra, nomeCliente, cpfCliente, nomeProdServ,
                codigoProdServ, valor, quantidade, tipoPet, racaPet, totalCompra
            });
            console.log(response.data);
            alert('Compra cadastrada com sucesso!');
        } catch (error: any) {
            if (error.response && error.response.status === 400 && error.response.data.error === "Erro: Compra já cadastrada!") {
                alert(error.response.data.error);
            } else {
                console.error(error);
                alert('Erro ao cadastrar compra.');
            }
        }
    }, [codigoCompra, nomeCliente, cpfCliente, nomeProdServ, 
        codigoProdServ, valor, quantidade, tipoPet, racaPet, totalCompra]);

    useEffect(() => {
        const quantidadeNum = parseFloat(quantidade);
        const valorNum = parseFloat(valor);
        if (!isNaN(quantidadeNum) && !isNaN(valorNum)) {
            setTotalCompra((quantidadeNum * valorNum).toFixed(2));
        } else {
            setTotalCompra('');
        }
    }, [quantidade, valor]);

    return (
        <div className="container-fluid">
            <form onSubmit={consumoSubmit}>
                <h4>Informações da compra:</h4>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Código da compra" 
                        aria-label="Código da compra" 
                        aria-describedby="basic-addon1"
                        onChange={event => setCodigoCompra(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome do cliente" 
                        aria-label="Nome do cliente" 
                        aria-describedby="basic-addon1"
                        onChange={event => setNomeCliente(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="CPF do cliente" 
                        aria-label="CPF do cliente" 
                        aria-describedby="basic-addon1"
                        onChange={event => setCpfCliente(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome do produto/serviço" 
                        aria-label="Nome do produto/serviço" 
                        aria-describedby="basic-addon1"
                        onChange={event => setNomeProdServ(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Código do produto/serviço" 
                        aria-label="Código do produto/serviço" 
                        aria-describedby="basic-addon1"
                        onChange={event => setCodigoProdServ(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Valor" 
                        aria-label="Valor" 
                        aria-describedby="basic-addon1"
                        onChange={event => setValor(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Quantidade" 
                        aria-label="Quantidade" 
                        aria-describedby="basic-addon1"
                        onChange={event => setQuantidade(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Tipo pet" 
                        aria-label="Tipo pet" 
                        aria-describedby="basic-addon1"
                        onChange={event => setTipoPet(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Raça pet" 
                        aria-label="Raça pet" 
                        aria-describedby="basic-addon1"
                        onChange={event => setRacaPet(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Total venda" 
                        aria-label="Total venda" 
                        aria-describedby="basic-addon1"
                        value={totalCompra} // Adiciona o valor calculado automaticamente
                        readOnly // Torna o campo somente leitura
                    />
                </div>
                <div className="input-group mb-3">
                    <button 
                        className="btn btn-outline-secondary" 
                        type="submit" 
                        style={{ background: tema }}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}