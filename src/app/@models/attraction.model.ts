export interface Attraction {
  id: number;
  county: string;
  district: string;
  name: string;
  address: string;
  telephone: string;
  openTime: string;
  info: string;
  description: string;
  createdAt: Date;
  updateAt?: Date;
}

