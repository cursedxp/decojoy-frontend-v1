import React from "react";
import isAdmin from "../../middleware/isAdmin";
import { GetServerSideProps } from "next";

const AdminContent: React.FC = () => {
  return <div>Admin-specific content here...</div>;
};

// Define a function called getServerSideProps to handle server-side rendering.
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if the current user is an admin by using the isAdmin middleware.
  const userIsAdmin = await isAdmin(context.req, context.res);

  // If the user is not an admin, redirect them to an unauthorized page.
  if (!userIsAdmin) {
    return {
      redirect: {
        destination: "/unauthorized", // Redirect to the "/unauthorized" page.
        permanent: false, // Indicate that this is not a permanent redirect.
      },
    };
  }

  // If the user is an admin, continue rendering the page.
  return {
    props: {}, // No additional props are passed to the AdminContent component.
  };
};

export default AdminContent;
