export interface OfferFormInputs {
  career: string;
  subject: string;
  mode: 'online' | 'in-person' | 'default';
  indications: string;
  price: number;
  description: string;

  image: FileList;
}