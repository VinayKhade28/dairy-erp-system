import api from './api';

export interface MilkCollection {
  collectionID?: number;
  collectionNumber?: string;
  collectionDate: string;
  farmerID: number;
  centerID: number;
  collectionTime?: string;
  quantity: number;
  fatPercentage?: number;
  snfPercentage?: number;
  clr?: number;
  temperature?: number;
  acidity?: number;
  ratePerLiter?: number;
  totalAmount?: number;
  collectionType: 'Manual' | 'Machine' | 'Bulk';
  shift: 'Morning' | 'Evening' | 'Night';
  paymentStatus?: 'Pending' | 'Paid' | 'Partial';
  batchNumber?: string;
  isPaid?: boolean;
  paymentDate?: string;
}

export interface CollectionSummary {
  date: string;
  totalQuantity: number;
  totalAmount: number;
  averageFat: number;
  farmerCount: number;
}

export interface CenterCollection {
  centerID: number;
  centerCode: string;
  centerName: string;
  totalQuantity: number;
  totalAmount: number;
  averageFat: number;
}

export interface CollectionSearchParams {
  fromDate?: string;
  toDate?: string;
  centerId?: number;
  farmerId?: number;
  shift?: 'Morning' | 'Evening' | 'Night';
  paymentStatus?: 'Pending' | 'Paid' | 'Partial';
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

export const collectionService = {
  // Record single collection
  recordCollection: async (collection: MilkCollection): Promise<MilkCollection> => {
    const response = await api.post('/milkcollection/daily-collection', collection);
    return response.data;
  },

  // Record bulk collections
  recordBulkCollections: async (collections: MilkCollection[]): Promise<MilkCollection[]> => {
    const response = await api.post('/milkcollection/bulk-collection', collections);
    return response.data;
  },

  // Get daily collection report
  getDailyReport: async (date: string, centerId?: number): Promise<MilkCollection[]> => {
    const response = await api.get('/milkcollection/daily-report', {
      params: { date, centerId }
    });
    return response.data;
  },

  // Get collection summary
  getCollectionSummary: async (params: CollectionSearchParams): Promise<PagedResult<MilkCollection>> => {
    const response = await api.get('/milkcollection/summary', { params });
    return response.data;
  },

  // Get farmer collection summary
  getFarmerCollectionSummary: async (farmerId: number, fromDate: string, toDate: string): Promise<CollectionSummary[]> => {
    const response = await api.get(`/milkcollection/farmer-summary/${farmerId}`, {
      params: { fromDate, toDate }
    });
    return response.data;
  },

  // Get center-wise collection
  getCenterCollection: async (date: string): Promise<CenterCollection[]> => {
    const response = await api.get('/milkcollection/center-wise', {
      params: { date }
    });
    return response.data;
  },

  // Update collection
  updateCollection: async (id: number, collection: Partial<MilkCollection>): Promise<MilkCollection> => {
    const response = await api.put(`/milkcollection/${id}`, collection);
    return response.data;
  },

  // Delete collection
  deleteCollection: async (id: number): Promise<void> => {
    await api.delete(`/milkcollection/${id}`);
  },

  // Get collection by ID
  getCollectionById: async (id: number): Promise<MilkCollection> => {
    const response = await api.get(`/milkcollection/${id}`);
    return response.data;
  },

  // Calculate rate based on fat percentage
  calculateRate: async (fatPercentage: number, snfPercentage?: number): Promise<{ ratePerLiter: number }> => {
    const response = await api.post('/milkcollection/calculate-rate', {
      fatPercentage,
      snfPercentage
    });
    return response.data;
  },

  // Generate collection receipt
  generateReceipt: async (collectionId: number): Promise<Blob> => {
    const response = await api.get(`/milkcollection/${collectionId}/receipt`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Export collections to Excel
  exportCollections: async (params: CollectionSearchParams): Promise<Blob> => {
    const response = await api.get('/milkcollection/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },

  // Mark collection as paid
  markAsPaid: async (collectionId: number, paymentDate: string): Promise<void> => {
    await api.post(`/milkcollection/${collectionId}/mark-paid`, { paymentDate });
  }
};

// PagedResult interface (same as in farmerService)
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default collectionService;