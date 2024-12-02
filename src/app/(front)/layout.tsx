import { Header } from "@/components/shared/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  // const isMounted = useIsMounted();
  // if (!isMounted) {
  //   return null;
  // }

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
