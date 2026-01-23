import api from "./githubApi";

export interface ResourceDTO {
  id: number;
  name: string;
}

export const ResourceService = {
  update: async (id: number, payload: Partial<ResourceDTO>) => {
    const { data } = await api.put<ResourceDTO>(`/resources/${id}`, payload);
    return data;
  },

  remove: async (id: number) => {
    await api.delete(`/resources/${id}`);
    return true;
  },
};
