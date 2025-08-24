export interface Profile {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  profileUrl: string;
  profileBase64Data: string;
  role: string;
}



export interface Props {
  profile: Profile;
}

export interface UpdateProps {
  profile: Profile;
  onSave: (updates: Partial<Profile>) => Promise<void>;
}