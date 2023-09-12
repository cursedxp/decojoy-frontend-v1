import React from "react";
import isAdmin from "../../middleware/isAdmin";
import { GetServerSideProps } from "next";

const AdminContent: React.FC = () => {
  return <div>Admin-specific content here...</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userIsAdmin = await isAdmin(context.req, context.res);
  if (!userIsAdmin) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default AdminContent;
