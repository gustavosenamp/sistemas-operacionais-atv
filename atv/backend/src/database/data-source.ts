import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cliente } from "../model/Cliente"
import { Compra } from "../model/Compra"
import { Pet } from "../model/Pet"
import { Produto } from "../model/Produto"
import { Servico } from "../model/Servico"
import { CreateClientes1718112944250 } from "./migrations/1718112944250-CreateClientes"
import { CreatePets1714929325649 } from "./migrations/1718112984793-CreatePets"
import { CreateProdutos1714929354075 } from "./migrations/1718112991047-CreateProdutos"
import { CreateServicos1714929371626 } from "./migrations/1718112998964-CreateServicos"
import { CreateCompras1714943017214 } from "./migrations/1718113006129-CreateCompras"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "G$mp07052005",
    database: "atvv",
    synchronize: true,
    logging: false,
    entities: [Cliente, Pet, Produto, Servico, Compra],
    migrations: [CreateClientes1718112944250,
        CreatePets1714929325649,
        CreateProdutos1714929354075,
        CreateServicos1714929371626,
        CreateCompras1714943017214
    ],
    subscribers: [],
})
