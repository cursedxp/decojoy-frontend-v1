import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="">
      <Link href="/"></Link>
      <Link href="/browse"></Link>
      <Link href="/exclusive"></Link>
      <Link href="/likedProducts"></Link>
      <Link href="/cart"></Link>
      <Link href="/singin"></Link>
      <Link href="/profile"></Link>
    </nav>
  );
};
export default Navbar;
