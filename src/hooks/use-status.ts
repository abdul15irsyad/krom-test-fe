import { useQuery } from '@tanstack/react-query';
import { axiosAPI, endpoints } from '../utils/axios-api';

export const useListStatuses = () => {
  const query = useQuery<{
    message: string;
    data: Status[];
  }>({
    queryKey: ['statuses'],
    queryFn: async () => {
      const response = await axiosAPI.get(endpoints.statuses.list);
      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
  return query;
};

export interface Status {
  id: string;
  name: string;
}
