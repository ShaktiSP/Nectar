import apiClient from './Apiclient';
import { CategoryApiModel } from '../data/CategoryModel';

export const getCategories = async (): Promise<CategoryApiModel[]> => {
  const response = await apiClient.get('/products/categories');
  return response.data;
};