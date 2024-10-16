import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Servico from "../model/Servico";


class ServicoController {
    async create(request: Request, response: Response) {

        const servicoRepository = AppDataSource.getRepository(Servico);

        const { codigoServico, nomeServico, precoServico } = request.body;
        
        const existServico = await servicoRepository.findOneBy({codigoServico});

        if(existServico) {
            return response.status(400).json({error: "Erro: Serviço já cadastrado!"});
        }

        const servico = servicoRepository.create({
            codigoServico, 
            nomeServico, 
            precoServico
        });

        await servicoRepository.save(servico);

        return response.json(servico);
    }

    async index(request: Request, response: Response) {
        const servicoRepository = AppDataSource.getRepository(Servico);

        const servicos = await servicoRepository.find();

        return response.json(servicos);
    }

    async show(request: Request, response: Response) {
        const servicoRepository = AppDataSource.getRepository(Servico);

        const { codigoServico } = request.params;

        const servico = await servicoRepository.findOne({ where: { codigoServico: String(codigoServico) } }); 

        return response.json(servico);
    }

    async update(request: Request, response: Response) {
        const servicoRepository = AppDataSource.getRepository(Servico);

        const { codigoServico: codigoServicoParam } = request.params;

        try {
            const servico = await servicoRepository.findOne({ where: { codigoServico: String(codigoServicoParam) } });
            if (!servico) {
                return response.status(404).json({ error: "Serviço não encontrado." });
            }

            const { codigoServico, nomeServico, precoServico } = request.body;

            servico.codigoServico = codigoServico || servico.codigoServico;
            servico.nomeServico = nomeServico || servico.nomeServico;
            servico.precoServico = precoServico || servico.precoServico;
            

            await servicoRepository.save(servico);

            return response.json(servico);
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao atualizar serviço." });
        }
    }

    async delete(request: Request, response: Response) {
        const servicoRepository = AppDataSource.getRepository(Servico);
        const { codigoServico } = request.params;

        try {
            const servico = await servicoRepository.findOne({ where: { codigoServico: String(codigoServico) } });
            if (!servico) {
                return response.status(404).json({ error: "Servico não encontrado." });
            }

            await servicoRepository.remove(servico);

            return response.json({ message: "Servico excluído com sucesso." });
        } catch (error) {
            console.error("Erro ao excluir servico:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao excluir servico." });
        }
    }
}

export default new ServicoController();