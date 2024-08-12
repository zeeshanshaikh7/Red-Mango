export default interface menuItemModel {
  id: number;
  name: string;
  description: string;
  specialTag: string;
  category: string;
  price: number;
  image: string ;
}

export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T;
}
