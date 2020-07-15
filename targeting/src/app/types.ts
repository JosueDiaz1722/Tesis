export class Link {
    id: string;
    description: string;
    url: string;
    createdAt: string;
  }

  export class Actor {
    id: string;
    name: string;
    prioridad: number;
    coments: string;
    parent: Boolean;
    hijos: [Actor];
    __typename: any;
  }

  export class Tema {
    id: string;
    name: string;
    prioridad: number;
    coments: string;
    parent: Boolean;
    hijos: [Tema];
    __typename: any;
  }

  export class Matriz{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    User: User;
    Actores: [Actor];
    Temas: [Tema];
    Celdas: [Celda];

  }
  export class Celda{
    id: string;
    TemaParent: Tema;
    ActorParent: Actor;
    prioridad: number;
    tiempo: number;
    coment: string;
  }

  export class Estado{
    id: string;
    NumActor: number;
    NumTemas: number;
  }

  export class User{
    id: string;
    name: string;
  }