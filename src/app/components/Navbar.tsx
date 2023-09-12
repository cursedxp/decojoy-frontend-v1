import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileImage from "./ProfileImage";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar: React.FC = () => {
  const { user, error, isLoading } = useUser();

  const renderIf = (condition: boolean, content: JSX.Element) => {
    return condition ? content : null;
  };

  return (
    <nav className="bg-white shadow-sm h-12 flex px-10 py-4 justify-between text-sm font-medium">
      <ul className="flex gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/browse">Browse</Link>
        </li>
        <li>
          <Link href="/exclusive">Exclusive</Link>
        </li>
      </ul>
      <ul className="flex gap-6 items-center">
        {!user && (
          <li>
            <Link href="/singin">Sing in</Link>
          </li>
        )}

        <li>
          <Link href="/cart">
            <ShoppingBagIcon className="h-6 w-6 text-black" />
          </Link>
        </li>
        <li>
          <HeartIcon className="h-6 w-6 text-black" />
        </li>
        {renderIf(
          !!user,
          <>
            <ProfileImage user={user} />
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
