import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold text-center">Hooks Practice</h1>

      {children}
    </div>
  );
}
