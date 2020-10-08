import {Link, Actor, Tema, Matriz,Estado} from './types';
// 1
import gql from 'graphql-tag'

// 2
export const ALL_LINKS_QUERY = gql`
  query LinksQuery {
    links {
      id
      createdAt
      url
      description
    }
  }
`;

// 3
export interface AllLinkQueryResponse {
  links: Link[];
  loading: boolean;
}

// 1
export const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(data:{
      description: $description,
      url: $url,
    }
    ) {
      id
      createdAt
      url
      description
    }
  }
`;

//3
export interface CreateLinkMutationResponse {
  createLink: Link;
  loading: boolean;
}

////ACTORES//////

export const ALL_ACTORES_QUERY = gql`
  query ActoresQuery {
    actors(where:{parent: true}){
      id
      name
      prioridad
      coments
      parent
      hijos{
        id
        name
        prioridad
        coments
        parent
        hijos{
          id
          name
          prioridad
          coments
          parent
          hijos{
            id
            name
            prioridad
            coments
            parent
          }
        }
      }
    }
  }
`;

// 3
export interface AllActoresQueryResponse {
  actores: Actor[];
  loading: boolean;
}

export const CREATE_ACTOR_MUTATION = gql`
  # 2
	mutation createActorMutation($name:String!, $prioridad: Int!, $coments: String){
    createActor(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments,
      parent: false
    }){
      id
      name
      prioridad
      coments
      parent
    }
  }
`;

export const CONNECT_ACTOR = gql`
  mutation ConnectActorParent($idHijo: Int!, $idPadre: Int!){
    updateActor(data:{
      hijos: {connect:{id: $idHijo}}},
      where: {id: $idPadre}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const CREATE_NEW_ACTOR_MUTATION = gql`
  # 2
  mutation createNewActorMutation($name:String!, $prioridad: Int!, $coments: String){
    createActor(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments
      parent: true
    }){
      name
      prioridad
      coments
    }
  }
`;

export const UPDATE_ACTOR_MUTATION = gql`
  # 2
  mutation updateActorMutation($name:String!, $prioridad: Int!, $coments: String, $id: Int!){
    updateActor(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments},
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const UPDATE_ACTOR_PRIORIDAD_MUTATION = gql`
  # 2
  mutation updateActorMutation($prioridad: Int!, $id: Int!){
    updateActor(data:{
      prioridad: $prioridad}
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const DELETE_ACTOR_MUTATION = gql`
  # 2
  mutation deleteActorMutation($id: Int!){
    deleteActor(
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;

///// TEMAS //////

export const ALL_TEMAS_QUERY = gql`
  query TemassQuery {
    temas (where:{parent: true}){
      id
      name
      prioridad
      coments
      parent
      hijos{
        id
        name
        prioridad
        coments
        parent
        hijos{
          id
          name
          prioridad
          coments
          parent
          hijos{
            id
            name
            prioridad
            coments
            parent
          }
        }
      }
    }
  }
`;

// 3
export interface AllTemasQueryResponse {
  temas: Tema[];
  loading: boolean;
}

export const CREATE_TEMA_MUTATION = gql`
  # 2
  mutation createTemaMutation($name:String!, $prioridad: Int!, $coments: String){
    createTema(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments,
      parent: false
    }){
      id
      name
      prioridad
      coments
    }
  }
`;

export const CONNECT_TEMA = gql`
  mutation ConnectTemaParent($idHijo: Int!, $idPadre: Int!){
    updateTema(data:{
      hijos: {connect:{id: $idHijo}}},
      where: {id: $idPadre}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const CREATE_NEW_TEMA_MUTATION = gql`
  # 2
  mutation createNewTemaMutation($name:String!, $prioridad: Int!, $coments: String){
    createTema(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments
      parent: true
    }){
      name
      prioridad
      coments
    }
  }
`;

export const UPDATE_TEMA_MUTATION = gql`
  # 2
  mutation updateTemaMutation($name:String!, $prioridad: Int!, $coments: String, $id: Int!){
    updateTema(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments},
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const UPDATE_TEMA_PRIORIDAD_MUTATION = gql`
  # 2
  mutation updateTemaMutation($prioridad: Int!, $id: Int!){
    updateTema(data:{
      prioridad: $prioridad},
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;

export const DELETE_TEMA_MUTATION = gql`
  # 2
  mutation deleteTemaMutation($id: Int!){
    deleteTema(
      where: {id:$id}
    ){
      name
      prioridad
      coments
    }
  }
`;



//////Matriz////////

export const ALL_MATRIZ_QUERY = gql`
  query AllMatrizQuery {
    matrizes{
      id
      createdAt
      updatedAt
      User{name}
    }
  }
`;

export const MATRIZ_QUERY = gql`
query MatriQuery ($id:ID) {
  matriz(where:{id: $id}){
    id
    Actores {
      id
      name
       hijos{
        id
        name
        hijos{
          id
          name
          hijos{
            id
            name
          }
        }
      }
    }
    Temas {
      id
      name
       hijos{
        id
        name
        hijos{
          id
          name
          hijos{
            id
            name
          }
        }
      }
    }
    
    Celdas{
      id
      prioridad
      tiempo
      coment
      ActorParent{
        id,
        prioridad
      }
      TemaParent{
        id,
        prioridad
      }
    }
  }
}

`;

export const ID_ACTORES = gql`
query idActores{
  actors(where: {parent: true}){
   id
 } 
 }
`;

export const ID_TEMAS = gql`
query idTemass{
  temas(where: {parent: true}){
   id
 } 
 }
`;


export const USER_MATRIZ_QUERY = gql`
query MatrizUser($id:ID!){
  matrizes(where:{User:{id:$id}}){
    id
    createdAt
    updatedAt
    User{name}
  }
}
`;
export const DELETE_MATRIZ_QUERY = gql`
  mutation DeleteMatrizQuery ($id:ID){
    deleteMatriz(where:{id: $id}){
      id
    }
  }
`;
export const CREAR_MATRIZ = gql`
mutation crearMatriz($id:ID,$actors:[ActorWhereUniqueInput!], $temas: [TemaWhereUniqueInput!], $celdas:[CeldaCreateWithoutMatrizInput!]){
  createMatriz(
  data:{
    Actores: {connect: $actors}
    Temas : {connect: $temas}
    Celdas: {create: $celdas}
    User: {connect:{id:$id}}
  }){
    id
     Actores{
      id
      parent
    }
    Temas{
      id
    }
    Celdas{
      id
      matriz{id}
    }
  }
}
`;

export const UPDATE_MATRIZ = gql`
mutation actualizarMatriz($matriz:ID,$actors:[ActorWhereUniqueInput!], $temas: [TemaWhereUniqueInput!], $celdas:[CeldaCreateWithoutMatrizInput!]){
  updateMatriz(
  data:{
    Actores: {connect: $actors}
    Temas : {connect: $temas}
    Celdas: {create: $celdas}
  },  where: {id: $matriz}){
    id
     Actores{
      id
      parent
    }
    Temas{
      id
    }
    Celdas{
      id
      matriz{id}
    }
  }
}
`;

export const DELETE_ALL_MATRIZ_QUERY = gql`
  mutation DeleteMatrizQuery {
    deleteManyMatrizes(where:{id_not:null}){
      count
    }
  }
`;



// 3
export interface AllMatrizQueryResponse {
  links: Matriz[];
  loading: boolean;
}

export const UPDATE_CELL_PRIORIDAD_MUTATION = gql`
  # 2
  mutation updateCellPrioridadMutation($prioridad: Int!, $id: ID){
    updateCelda(data:{
      prioridad: $prioridad},
      where: {id:$id}
    ){
      TemaParent{
        id
      }
      ActorParent{
        id
      }
      prioridad
      tiempo
      coment
    }
  }
`;

export const UPDATE_CELL_TIEMPO_MUTATION = gql`
  # 2
  mutation updateCellTiempoMutation($tiempo: Int!, $id: ID){
    updateCelda(data:{
      tiempo: $tiempo},
      where: {id:$id}
    ){
      TemaParent{
        id
      }
      ActorParent{
        id
      }
      prioridad
      tiempo
      coment
    }
  }
`;

export const CREATE_CELL_MUTATION = gql`
  # 2
  mutation matrix($idTema: Int!,$idActor: Int!, $prioridad:Int, $tiempo:Int, $coment:String){
    createMatriz(data:{
      TemaParent: {connect:{id:$idTema}},
      ActorParent: {connect:{id:$idActor}},
      prioridad: $prioridad,
      tiempo: $tiempo,
      coment: $coment
    }){
      id
      TemaParent{
        id
      }
      ActorParent{
        id
      }
      prioridad
      tiempo
      coment
    }
  }
`;

export const DELETE_CELL_MUTATION = gql`
  # 2
  mutation deleteCelda($matriz:ID){
    deleteManyCeldas(where: {matriz:{id:$matriz} }){
      count
    }
  }
`;

export const DELETE_ACTOR_CELL_MUTATION = gql`
  # 2
  mutation deleteActorMatrizParent($id:Int){
    deleteManyMatrizes(
      where: {ActorParent: {id: $id}}
    ){
      count
    }
  }
`;

export const DELETE_TEMA_CELL_MUTATION = gql`
  # 2
  mutation deleteActorMatrizParent($id:Int){
    deleteManyMatrizes(
      where: {TemaParent: {id: $id}}
    ){
      count
    }
  }
`;

export const ESTADO_QUERY = gql`
 query EstadoQuery {
    estadoes {
      id
      NumTemas
      NumActor
    }
  }
`;

export const UPDATE_ESTADO_TEMA_MUTATION = gql`
  # 2
  mutation updateEstadoTemaMutation($id: ID, $NumTemas: Int){
    updateEstado(data:{
      NumTemas: $NumTemas},
      where: {id:$id}
    ){
      id
      NumActor
      NumTemas
    }
  }
`;

export const UPDATE_ESTADO_ACTOR_MUTATION = gql`
  # 2
  mutation updateEstadoTemaMutation($id: ID, $NumActor: Int){
    updateEstado(data:{
      NumActor: $NumActor},
      where: {id:$id}
    ){
      id
      NumActor
      NumTemas
    }
  }
`;


// 3
export interface EstadoResponse {
  estado: Estado[];
  loading: boolean;
}

export const Subscription_Celda = gql`
subscription followedAuthorCreatedPost ($id:ID!) {
  celda(
    where: {
      mutation_in: [UPDATED]
      node: {
        matriz: {
          id: $id
        }
      }
    }
  ) {
    mutation
    node {
     id
      prioridad
      tiempo
      TemaParent{id}
      ActorParent{id}
      matriz{id}
    }
  }
}
`;

export const GET_USER = gql`
query getUser($name:String){
  users(where:{name:$name} ){
    id
    name
  }
}
`;

export const CREAR_USER = gql`
mutation crearUsuer($name: String!){
  createUser(data: {name: $name}){
    id
    name
  }
}
`;