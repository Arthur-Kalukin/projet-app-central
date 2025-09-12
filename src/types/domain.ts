export type ID = string;

export interface Point {
  id: ID;
  code: string;
  name: string;
  address: string;
  clientId: ID;
  serviceId: ID;
}

export interface Client {
  id: ID;
  name: string;
}

export interface Service {
  id: ID;
  name: string;
}

export interface ServiceTree {
  service: Service;
  clients: Array<{
    client: Client;
    points: Point[];
  }>;
}
