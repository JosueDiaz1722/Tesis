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
    parent: [Actor];
  }

  export class Tema {
    id: string;
    name: string;
    prioridad: number;
    coments: string;
    parent: [Tema];
  }