import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentJobMatch, StudentProfile } from "../backend.d";
import { useActor } from "./useActor";

export function useGetStudentProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<StudentProfile>({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      if (!actor) return { name: "", skills: [] };
      return actor.getStudentProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetJobsByPercent() {
  const { actor, isFetching } = useActor();
  return useQuery<StudentJobMatch[]>({
    queryKey: ["jobsByPercent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobsByPercent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: StudentProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      queryClient.invalidateQueries({ queryKey: ["jobsByPercent"] });
    },
  });
}
