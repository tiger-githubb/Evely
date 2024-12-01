import { MainHeader } from "./main-header";

export const Header = () => {
  return (
    <>
      <header className="sticky left-0 top-0 z-30 w-full transition-transform duration-300" role="banner">
        <div className="flex flex-col bg-background shadow-sm">
          <MainHeader />
        </div>
      </header>
    </>
  );
};
