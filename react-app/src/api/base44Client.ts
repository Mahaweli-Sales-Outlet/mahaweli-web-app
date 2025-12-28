// Temporary stub to keep migrated pages compiling.
// Replace with real API client.

export const base44 = {
  auth: {
    async me(): Promise<{
      email?: string;
      role?: "admin" | "customer";
    } | null> {
      return null;
    },
  },
  entities: {
    Product: {
      async list(_order?: string): Promise<any[]> {
        return [];
      },
      async create(_data: any): Promise<any> {
        return {};
      },
      async update(_id: string, _data: any): Promise<any> {
        return {};
      },
      async delete(_id: string): Promise<void> {
        return;
      },
    },
    CartItem: {
      async filter(_query: any): Promise<any[]> {
        return [];
      },
    },
    Order: {
      async list(_order?: string): Promise<any[]> {
        return [];
      },
      async create(_data: any): Promise<any> {
        return {};
      },
      async update(_id: string, _data: any): Promise<any> {
        return {};
      },
      async delete(_id: string): Promise<void> {
        return;
      },
    },
  },
  integrations: {
    Core: {
      async UploadFile(_params: { file: File }): Promise<{ file_url: string }> {
        return { file_url: "" };
      },
    },
  },
};
