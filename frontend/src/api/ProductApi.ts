import {Product} from "../model/Product";
import axios from "axios";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products');
    return response.data;
};

export const getProduct = async (productId: string): Promise<Product> => {
    const response = await axios.get<Product>('/api/products/'+productId);
    return response.data;
};

export const getShoppingCart = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products/shopping-carts');
    return response.data;
};

export const getOrdered= async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products/ordered');
    return response.data;
};

export const removeFromShoppingCart = async (productId: string): Promise<Product> => {
    const response = await axios.delete('/api/products/shopping-carts/'+productId);
    return response.data;
};
export const deleteProduct = async (productId: string): Promise<Product> => {
    const response = await axios.delete<Product>('/api/products/'+productId);
    return response.data;
};


export const getByTitle = async (name: string): Promise<Product[]> => {
    const response = await axios.get('/api/products/search-by-name/'+name);
    return response.data;
};
