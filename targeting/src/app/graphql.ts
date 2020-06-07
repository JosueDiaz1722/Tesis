import {Link, Actor, Tema, Matriz} from './types';
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
