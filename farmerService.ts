import api from './api';

export interface Farmer {
  farmerID: number;
  farmerCode: string;
  fullName: string;
  fatherName?: string;
  contactNumber: string;
  alternateContact?: string;
  address?: string;
  village?: string;
  taluka?: string;
  district?: string;
  state?: string;
  pincode?: string;
  bankAccountNumber?: string;
  ifscode?: string;
  bankName?: string;
  branchName?: string;
  aadharNumber?: string;
  registrationDate: string;
  isActive: boolean;
  totalCollections?: number;
  totalAmount?: number;
  balanceAmount?: number;
}

export interface CreateFarmerDTO {
  farmerCode?: string;
  fullName: string;
  fatherName?: string;
  contactNumber: string;
  alternateContact?: string;
  address?: string;
  village?: string;
  taluka?: string;
  district?: string;
  state?: string;
  pincode?: string;
  bankAccountNumber?: string;
  ifscode?: string;
  bankName?: string;
  branchName?: string;
  aadharNumber?: string;
}

export interface UpdateFarmerDTO extends Partial<CreateFarmerDTO> {
  isActive?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FarmerSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  isActive?: boolean;
}

export const farmerService = {
  // Get all farmers (your .NET endpoint: GET /api/Farmers)
  getAllFarmers: async (): Promise<Farmer[]> => {
    const response = await api.get('/Farmers');
    return response.data;
  },

  // Get farmers with pagination and search
  getFarmers: async (params: FarmerSearchParams = {}): Promise<PagedResult<Farmer>> => {
    // For now, get all and paginate on client side
    const allFarmers = await farmerService.getAllFarmers();
    
    // Apply search filter if provided
    let filteredFarmers = allFarmers;
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredFarmers = allFarmers.filter(farmer =>
        farmer.fullName.toLowerCase().includes(searchLower) ||
        farmer.farmerCode.toLowerCase().includes(searchLower) ||
        farmer.village?.toLowerCase().includes(searchLower) ||
        farmer.contactNumber.includes(searchLower)
      );
    }
    
    // Apply active filter if provided
    if (params.isActive !== undefined) {
      filteredFarmers = filteredFarmers.filter(farmer => farmer.isActive === params.isActive);
    }
    
    // Apply pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredFarmers.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      totalCount: filteredFarmers.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredFarmers.length / pageSize)
    };
  },

  // Get farmer by ID (your .NET endpoint: GET /api/Farmers/{id})
  getFarmerById: async (id: number): Promise<Farmer> => {
    const response = await api.get(`/Farmers/${id}`);
    return response.data;
  },

  // Create new farmer (your .NET endpoint: POST /api/Farmers)
  createFarmer: async (farmerData: CreateFarmerDTO): Promise<Farmer> => {
    // Generate farmer code if not provided
    const dataToSend = {
      ...farmerData,
      farmerCode: farmerData.farmerCode || `FARM${Date.now().toString().slice(-6)}`
    };
    
    const response = await api.post('/Farmers', dataToSend);
    return response.data;
  },

  // Update farmer (your .NET endpoint: PUT /api/Farmers/{id})
  updateFarmer: async (id: number, farmerData: UpdateFarmerDTO): Promise<void> => {
    await api.put(`/Farmers/${id}`, farmerData);
  },

  // Delete farmer (soft delete) - Note: Your .NET endpoint might be DELETE /api/Farmers/{id}
  deleteFarmer: async (id: number): Promise<void> => {
    await api.delete(`/Farmers/${id}`);
  },

  // Search farmers by name, code, or village (your .NET endpoint: GET /api/Farmers/search?searchTerm=...)
  searchFarmers: async (searchTerm: string): Promise<Farmer[]> => {
    const response = await api.get('/Farmers/search', {
      params: { searchTerm }
    });
    return response.data;
  },

  // Test method to check if service is working
  testService: async (): Promise<{ success: boolean; count?: number; error?: string }> => {
    try {
      const farmers = await farmerService.getAllFarmers();
      return {
        success: true,
        count: farmers.length
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get farmer's milk collections (using your .NET Reports endpoint)
  getFarmerCollections: async (farmerId: number, fromDate?: string, toDate?: string): Promise<any[]> => {
    try {
      // You might need to adjust this endpoint based on your .NET API
      const response = await api.get(`/Reports/farmer-collections/${farmerId}`, {
        params: { 
          fromDate: fromDate || new Date().toISOString().split('T')[0],
          toDate: toDate || new Date().toISOString().split('T')[0]
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching farmer collections:', error);
      return [];
    }
  },

  // Get farmer payment summary (using your .NET Reports endpoint)
  getFarmerPaymentSummary: async (farmerId: number, fromDate: string, toDate: string): Promise<any> => {
    try {
      const response = await api.get('/Reports/farmer-payment-summary', {
        params: { 
          farmerId,
          fromDate,
          toDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching farmer payment summary:', error);
      return null;
    }
  },

  // Simple create farmer with minimal data (for quick testing)
  createTestFarmer: async (): Promise<Farmer> => {
    const testData: CreateFarmerDTO = {
      fullName: `Test Farmer ${Date.now().toString().slice(-4)}`,
      contactNumber: `98765${Date.now().toString().slice(-5)}`,
      village: 'Test Village',
      farmerCode: `TEST${Date.now().toString().slice(-4)}`
    };
    
    return farmerService.createFarmer(testData);
  }
};

export default farmerService;