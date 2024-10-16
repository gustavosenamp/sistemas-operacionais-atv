import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import ListaProduto from "./listaProduto";
import ListaServico from "./listaServico";
import ListaCompra from "./listaConsumo";
import FormularioCadastroClienteEPet from "./formularioCadastroClienteEPet";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioCadastroConsumo from "./formularioCadastroConsumo";
//import Analises from "./analises";
import ListaPet from "./listaPets";
import ListasGerais from "./listasGerais";

type Tela =
  | "Clientes"
  | "Pets"
  | "Produtos"
  | "Serviços"
  | "Compras"
  | "Cadastrar Cliente/Pet"
  | "Cadastrar Produto"
  | "Cadastrar Serviço"
  | "Comprar"
  | "Listas Gerais";

export default function Roteador() {
  const [tela, setTela] = useState<Tela>("Clientes");

  const selecionarView = (valor: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTela(valor as Tela);
  };
  

  const construirView = () => {
    let barraNavegacao = (
      <BarraNavegacao
        seletorView={selecionarView}
        tema="#e3f2fd"
        botoes={[
          "Clientes",
          "Pets",
          "Produtos",
          "Serviços",
          "Compras",
          "Cadastrar Cliente/Pet",
          "Cadastrar Produto",
          "Cadastrar Serviço",
          "Comprar",
          "Listas Gerais",
        ]}
      />
    );

    switch (tela) {
      case "Clientes":
        return (
          <>
            {barraNavegacao}
            <ListaCliente />
          </>
        );
      case "Pets":
        return (
          <>
            {barraNavegacao}
            <ListaPet />
          </>
        );
      case "Produtos":
        return (
          <>
            {barraNavegacao}
            <ListaProduto />
          </>
        );
      case "Serviços":
        return (
          <>
            {barraNavegacao}
            <ListaServico />
          </>
        );
      case "Compras":
        return (
          <>
            {barraNavegacao}
            <ListaCompra />
          </>
        );
      case "Cadastrar Cliente/Pet":
        return (
          <>
            {barraNavegacao}
            <FormularioCadastroClienteEPet tema="#e3f2fd" />
          </>
        );
      case "Cadastrar Produto":
        return (
          <>
            {barraNavegacao}
            <FormularioCadastroProduto tema="#e3f2fd" />
          </>
        );
      case "Cadastrar Serviço":
        return (
          <>
            {barraNavegacao}
            <FormularioCadastroServico tema="#e3f2fd" />
          </>
        );
      case "Comprar":
        return (
          <>
            {barraNavegacao}
            <FormularioCadastroConsumo tema="#e3f2fd" />
          </>
        );
      case "Listas Gerais":
        return (
          <>
            {barraNavegacao}
            {<ListasGerais tema="#e3f2fd" />}
          </>
        );
      default:
        return null;
    }
  };

  return construirView();
}
