import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <Card className={`w-full max-w-lg mx-auto p-8 ${className}`}>
      {children}
    </Card>
  );
}