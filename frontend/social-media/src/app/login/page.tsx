import AuthForm from "@/components/authForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
