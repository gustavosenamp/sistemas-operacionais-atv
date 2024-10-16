import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Pet from "../model/Pet";


class PetController {
    async create(request: Request, response: Response) {

        const petRepository = AppDataSource.getRepository(Pet);

        const { cpfDono, nomePet, tipo, raca, genero} = request.body;
        
        const existPet = await petRepository.findOneBy({nomePet});

        if(existPet) {
            return response.status(400).json({error: "Erro: Pet já cadastrado!"});
        }

        const pet = petRepository.create({
            cpfDono, 
            nomePet, 
            tipo, 
            raca, 
            genero
        });

        await petRepository.save(pet);

        return response.json(pet);
    }

    async index(request: Request, response: Response) {
        const petRepository = AppDataSource.getRepository(Pet);

        const pets = await petRepository.find();

        return response.json(pets);
    }

    async show(request: Request, response: Response) {
        const petRepository = AppDataSource.getRepository(Pet);

        const { nomePet } = request.params;

        const pet = await petRepository.findOne({ where: { nomePet: String(nomePet) } }); 

        return response.json(pet);
    }

    async update(request: Request, response: Response) {
        const petRepository = AppDataSource.getRepository(Pet);
    
        const { nomePet: codigoPetParam } = request.params;
    
        try {
            const pet = await petRepository.findOne({ where: { nomePet: String(codigoPetParam) } });
            if (!pet) {
                return response.status(404).json({ error: "Pet não encontrado." });
            }
    
            const { cpfDono, nomePet, tipo, raca, genero } = request.body;
    
            pet.cpfDono = cpfDono || pet.cpfDono;
            pet.nomePet = nomePet || pet.nomePet;
            pet.tipo = tipo || pet.tipo;
            pet.raca = raca || pet.raca;
            pet.genero = genero || pet.genero;
            
    
            await petRepository.save(pet);
    
            return response.json(pet);
        } catch (error) {
            console.error("Erro ao atualizar pet:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao atualizar pet." });
        }
    }

    async delete(request: Request, response: Response) {
        const petRepository = AppDataSource.getRepository(Pet);
        const { nomePet } = request.params;

        try {
            const pet = await petRepository.findOne({ where: { nomePet: String(nomePet) } });
            if (!pet) {
                return response.status(404).json({ error: "Pet não encontrado." });
            }

            await petRepository.remove(pet);

            return response.json({ message: "Pet excluído com sucesso." });
        } catch (error) {
            console.error("Erro ao excluir pet:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao excluir pet." });
        }
    }
}

export default new PetController();