import { useUser } from "@auth0/nextjs-auth0/client";

import Link from "next/link";

const Home: React.FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <ul>
          <li>
            <Link href={"admin/concepts"}>Concepts</Link>
          </li>
          <li>
            <Link href={"admin/products"}>Projects</Link>
          </li>
        </ul>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
      </div>
    );
  }

  return <Link href="/api/auth/login">Login</Link>;
};
export default Home;
