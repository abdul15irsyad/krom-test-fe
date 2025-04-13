import { useQuery } from '@tanstack/react-query';
import { axiosAPI, endpoints } from '../utils/axios-api';

export const useListRoles = () => {
  const query = useQuery<{
    message: string;
    data: Role[]
  }>({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await axiosAPI.get(endpoints.roles.list);
      return response.data;
    },
    staleTime: 0,
    retry: false
  });
  return query;
};

export interface Role {
  id: string;
  name: string;
}