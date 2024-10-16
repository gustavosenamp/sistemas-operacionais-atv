import { Router } from 'express';

import ClienteController from './controllers/ClienteController';
import PetController from './controllers/PetController';
import ProdutoController from './controllers/ProdutoController';
import ServicoController from './controllers/ServicoController';
import CompraController from './controllers/CompraController';

const router = Router();

// Rotas de criação
router.post("/clientes", ClienteController.create);
router.post("/pets", PetController.create);
router.post("/produtos", ProdutoController.create);
router.post("/servicos", ServicoController.create);
router.post("/compras", CompraController.create);

// Rotas de listagem
router.get("/listaCliente", ClienteController.index);
router.get("/listaProduto", ProdutoController.index);
router.get("/listaServico", ServicoController.index);
router.get("/listaPet", PetController.index);
router.get("/listaCompra", CompraController.index);

// Rotas de atualização
router.put("/editarCliente/:cpf", ClienteController.update);
router.put("/editarProduto/:codigoProduto", ProdutoController.update);
router.put("/editarServico/:codigoServico", ServicoController.update);
router.put("/editarPet/:nomePet", PetController.update);
router.put("/editarCompra/:codigoCompra", CompraController.update);

// Rotas de exclusão
router.delete("/excluirCliente/:cpf", ClienteController.delete);
router.delete("/excluirProduto/:codigoProduto", ProdutoController.delete);
router.delete("/excluirServico/:codigoServico", ServicoController.delete);
router.delete("/excluirPet/:nomePet", PetController.delete);
router.delete("/excluirCompra/:codigoCompra", CompraController.delete);

// Rotas de análises
router.get("/compras/top-clientes-quantidade", CompraController.topClientesQuantidade);
router.get("/compras/produtos-servicos-mais-consumidos", CompraController.produtosServicosMaisConsumidos);
router.get("/compras/consumo-por-tipo-e-raca", CompraController.consumoPorTipoERaca);
router.get("/compras/top-clientes-valor", CompraController.topClientesValor);

export { router };