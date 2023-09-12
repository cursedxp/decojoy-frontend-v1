import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <Link href="/">Home</Link>
      <Link href="/browse">Browse</Link>
      <Link href="/exclusive">Exclusive</Link>
      <Link href="/likedProducts">Liked Products</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/singin">Singin</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};
export default Navbar;
