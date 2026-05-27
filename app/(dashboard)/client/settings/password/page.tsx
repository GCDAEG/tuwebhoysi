import React from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface PasswordPageProps {
  e?: null;
}

const PasswordPage: React.FC<PasswordPageProps> = ({}) => {
  return <ChangePasswordForm />;
};

export default PasswordPage;
