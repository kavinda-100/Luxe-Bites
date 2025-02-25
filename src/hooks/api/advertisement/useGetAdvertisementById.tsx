"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdvertisementById } from "../../../actions/advertisementsAction";

export const useGetAdvertisementById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["advertisement", id],
    queryFn: async () => getAdvertisementById(id),
  });

  return { data, isLoading, error };
};
