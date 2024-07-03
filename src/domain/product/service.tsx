import axios, { AxiosResponse } from "axios";
import { ProductsResponse, ProductToCreateDto } from "./model";

export const fetchProducts = async (searchStr: string): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>('https://dummyjson.com/products?' + searchStr);
    return response.data;
};

export const createProduct = async (product: ProductToCreateDto): Promise<AxiosResponse> => {
    const response = await axios.post('https://dummyjson.com/products/add', product);
    return response;
}