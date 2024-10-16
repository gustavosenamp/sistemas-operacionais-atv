import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Produto from "../model/Produto";

class ProdutoController{
    async create(request: Request, response: Response){

        const produtoRepository = AppDataSource.getRepository(Produto);

        const { codigoProduto, nomeProduto, precoProduto } = request.body;

        const existProduto = await produtoRepository.findOneBy({ nomeProduto });

        if (existProduto){
            return response.status(400).json({ error: "Erro: Produto já cadastro!" });
        }

        const produto = produtoRepository.create({
            codigoProduto,
            nomeProduto,
            precoProduto
        });

        await produtoRepository.save(produto)

        return response.json(produto);
    }

    async index(request: Request, response: Response){
        const produtoRepository = AppDataSource.getRepository(Produto);

        const produtos = await produtoRepository.find()

        return response.json(produtos);
    }

    async show(request: Request, response: Response){
        const produtoRepository = AppDataSource.getRepository(Produto);

        const { nomeProduto } = request.params;

        const produto = await produtoRepository.findOne({ where: {nomeProduto: String (nomeProduto) } });

        return response.json(produto);
    }

    async update(request: Request, response: Response){
        const produtoRepository = AppDataSource.getRepository(Produto);

        const { nomeProduto: nomeProdutoParam } = request.params;

        try {
            const produto = await produtoRepository.findOne({ where: { codigoProduto: String(nomeProdutoParam) } });
            if (!produto) {
                return response.status(404).json({ error: "Produto não encontrado." });
            }
    
            const { nomeProduto, precoProduto } = request.body;
    
            produto.nomeProduto = nomeProduto || produto.nomeProduto;
            produto.precoProduto = precoProduto || produto.precoProduto;
    
            await produtoRepository.save(produto);
    
            return response.json(produto);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao atualizar produto." });
        }
    }

    async delete(request: Request, response: Response) {
        const produtoRepository = AppDataSource.getRepository(Produto);
        const { nomeProduto } = request.params;

        try {
            const produto = await produtoRepository.findOne({ where: { nomeProduto: String(nomeProduto) } });
            if (!produto) {
                return response.status(404).json({ error: "Produto não encontrado." });
            }

            await produtoRepository.remove(produto);

            return response.json({ message: "Produto excluído com sucesso." });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            return response.status(500).json({ error: "Erro interno do servidor ao excluir produto." });
        }
    }
}

export default new ProdutoController();
    
