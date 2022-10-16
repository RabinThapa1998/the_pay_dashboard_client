export interface IProgramDetails {
  data: Data;
}

export interface Data {
  program: Program;
  contestants: Contestant[];
}

export interface Contestant {
  email: string;
  phone: string;
  full_name: string;
  photo_url: string;
  program: string;
  payment: string;
  age: number;
  address: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface Program {
  image_url: string;
  payment_schema: PaymentSchema[];
  name: string;
  desc: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface PaymentSchema {
  votes: number;
  cost: number;
}
