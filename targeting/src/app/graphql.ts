import {Link, Actor} from './types';
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
  mutation createActorMutation($name:String!, $prioridad: Int!, $coments: String!, $id: Int!){
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