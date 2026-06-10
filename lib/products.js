import api from './auth';

export const productService = {
  // Get all products
  async getAllProducts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/products${queryParams ? `?${queryParams}` : ''}`);
    return response.data;
  },

  // Get single product
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product (protected)
  async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (protected)
  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (protected)
  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};
