import React from "react";
import { Props } from "/src/shared/Model";

const ProfileCard: React.FC<Props> = ({ profile }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6">
      <img
        src={profile.profileUrl || `data:image/png;base64,${profile.profileBase64Data}`}
        alt={profile.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-500">{profile.phoneNumber || "No phone added"}</p>
        <span className="text-sm text-blue-600 font-medium">{profile.role}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
