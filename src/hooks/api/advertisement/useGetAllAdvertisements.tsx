"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllAdvertisements } from "../../../actions/advertisementsAction";

export const useGetAllAdvertisements = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["advertisements"],
    queryFn: getAllAdvertisements,
  });

  return { data, isLoading, error };
};
