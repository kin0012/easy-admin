import AuthProvider from "../context/auth-provider";
import UserLayout from "@/components/Layouts/UserLayout";
import { auth } from "@/auth";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const session = auth();

  return (
    <AuthProvider session={session}>
      <UserLayout>{children}</UserLayout>
    </AuthProvider>
  );
}
