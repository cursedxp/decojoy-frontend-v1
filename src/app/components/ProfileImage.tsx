import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface ProfileImageProps {
  user: UserProfile | null | undefined;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <li>
      <Link href="/profile">
        {user.picture ? (
          <img
            src={user.picture}
            className="rounded-full h-8 w-8"
            alt={user.name || "User"}
          />
        ) : (
          <UserCircleIcon className="h-8 w-8 text-red-900" />
        )}
      </Link>
    </li>
  );
};

export default ProfileImage;
