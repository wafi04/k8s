import { Api } from "@/lib/axios";
import { PodsResponse } from "@/types/pods";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = new Api();

export function useGetPods() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pods"],
    queryFn: async () => {
      const req = await axios.get("/api/k8s/pods");
      return req;
    },
    refetchOnReconnect: true,
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });

  return {
    data: data?.data.data as PodsResponse,
    isLoading,
    error,
  };
}

export function useCreatePods() {
  return useMutation({
    mutationKey: ["pods"],
    mutationFn: async () => {},
  });
}

export function useDeletePods() {
  return useMutation({
    mutationKey: ["pods"],
    mutationFn: async (data: { podName: string; namespace: string }) => {
      const response = await axios.delete(
        `/api/k8s/pods?podName=${data.podName}&ns=${data.namespace}`
      );
      return response.data;
    },
  });
}

export function useUpdatePods() {}
