import { useEffect, useState } from "react";
import { Profile } from "/src/shared/Model";
import { fetchProfileInfo } from "/src/services/UserService";
import useLoading from "./useLoading";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { LoadingComponent, withLoading } = useLoading();

  useEffect(() => {
    withLoading(async () => {
      try {
        const data = await fetchProfileInfo();
        setProfile(data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    });
  }, []);

  const saveProfile = async (updates: Partial<Profile>) => {
    // const updated = await updateProfile(updates);
    // setProfile(updated);
    return "";
  };

   return { profile, LoadingComponent, saveProfile, withLoading };
};
