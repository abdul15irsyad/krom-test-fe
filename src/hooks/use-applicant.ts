import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosAPI, endpoints } from '../utils/axios-api';
import { isEmpty } from 'lodash';

export const useApplicants = ({ page, limit, search, appliedRoleId, statusId }: {
  page?: number;
  limit?: number;
  search?: string;
  appliedRoleId?: string;
  statusId?: string;
} = {}) => {
  const query = useQuery<{
    message: string;
    meta?: {
      totalAllData: number
    },
    data: Applicant[]
  }>({
    queryKey: ['applicants', page, limit, search, appliedRoleId, statusId],
    queryFn: async () => {
      const response = await axiosAPI.get(endpoints.applicants.root, {
        params: {
          page: page ?? 1,
          limit,
          search: !isEmpty(search) ? search : undefined,
          appliedRoleId: !isEmpty(appliedRoleId) ? appliedRoleId : undefined,
          statusId: !isEmpty(statusId) ? statusId : undefined
        }
      });
      return response.data;
    },
    staleTime: 0,
    retry: false
  });
  return query;
};

export const useApplicant = (id: string) => {
  const query = useQuery<{
    message: string;
    meta?: {
      totalAllData: number
    },
    data: Applicant
  }>({
    queryKey: ['applicant', id],
    queryFn: async () => {
      const response = await axiosAPI.get(endpoints.applicants.detail(id));
      return response.data;
    },
    staleTime: 0,
    retry: false
  });
  return query;
};

export const useCreateApplicant = () => {
  const mutation = useMutation({
    mutationKey: ['createApplicant'],
    mutationFn: async (data) => {
      const response = await axiosAPI.post(endpoints.applicants.root, data);
      return response.data;
    },
    retry: false
  });
  return mutation;
};

export interface Applicant {
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  location: string,
  appliedRoleId: string,
  yearsOfExperience: number,
  applicationStatusId: string,
  resumeURL: string,
  updatedAt: string,
  createdAt: string,
  appliedRole: {
    id: string,
    name: string,
    slug: string,
    updatedAt: string,
    createdAt: string
  },
  applicationStatus: {
    id: string,
    name: string,
    slug: string,
    updatedAt: string,
    createdAt: string
  }
}