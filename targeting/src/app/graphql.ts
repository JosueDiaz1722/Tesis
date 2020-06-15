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

export const ALL_ACTORES_QUERY = gql`
  query ActoresQuery {
    actors{
      id
      name
      prioridad
      coments
      parent{
        id
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
  mutation createActorMutation($name:String!, $prioridad: Int!, $coments: String, $id: Int!){
    createActor(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments,
      parent: {connect: {id: $id}}
    }){
      name
      prioridad
      coments
      parent{
        id
      }
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

export const DELETE_HIJO_ACTOR_MUTATION = gql`
  # 2
  mutation deleteHijoActorMutation($id: Int!){
    deleteManyActors(
      where: { parent: {id: $id} }
    ){
      count
    }
  }
`;
export const ALL_TEMAS_QUERY = gql`
  query TemassQuery {
    temas{
      id
      name
      prioridad
      coments
      parent{
        id
      }
    }
  }
`;

// 3
export interface AllActoresQueryResponse {
  temas: Tema[];
  loading: boolean;
}

export const CREATE_TEMA_MUTATION = gql`
  # 2
  mutation createTemaMutation($name:String!, $prioridad: Int!, $coments: String, $id: Int!){
    createTema(data:{
      name: $name,
      prioridad: $prioridad,
      coments: $coments,
      parent: {connect: {id: $id}}
    }){
      name
      prioridad
      coments
      parent{
        id
      }
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

export const DELETE_HIJO_TEMA_MUTATION = gql`
  # 2
  mutation deleteHijoTemaMutation($id: Int!){
    deleteManyTemas(
      where: {
        parent: {id: $id}
      }
    ){
      count
    }
  }
`;

export const HIJO_TEMA_QUERY = gql`
  # 2
  query TemasHijosQuery  {
    temas(where: { NOT: [{ parent: null }] }) {
    id
    name
    prioridad
    parent{
      id
    }
  }
  }
`;

export const PARENT_TEMA_QUERY = gql`
  # 2
  query TemasParentQuery  {
    temas(
      where: {parent:null}
    ){
    	id
      name
      prioridad
      coments
      parent{
        id
      }
    }
  }
`;

export const HIJO_ACTOR_QUERY = gql`
  # 2
  query ActorHijosQuery  {
    actors(where: { NOT: [{ parent: null }] }) {
    id
    name
    prioridad
    parent{
      id
    }
  }
  }
`;

export const PARENT_ACTOR_QUERY = gql`
  # 2
  query ActoresParentQuery  {
    actors(
      where: {parent:null}
    ){
    	id
      name
      prioridad
      coments
      parent{
        id
      }
    }
  }
`;

export const ALL_MATRIZ_QUERY = gql`
  query MatrizQuery {
    matrizes{
      id
      tiempo
      prioridad
      coment
      TemaParent{
        id
      }
      ActorParent{
        id
      }
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
    updateMatriz(data:{
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
  mutation deleteCellMutation($id: ID){
    deleteMatriz(
      where: {id:$id}
    ){
      id
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
