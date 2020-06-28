"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Actor",
    embedded: false
  },
  {
    name: "Tema",
    embedded: false
  },
  {
    name: "Celda",
    embedded: false
  },
  {
    name: "Estado",
    embedded: false
  },
  {
    name: "Matriz",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
