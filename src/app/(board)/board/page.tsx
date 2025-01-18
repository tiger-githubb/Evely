import { FavoriteEvents } from "./_components/favorite-events";
import { OrdersSection } from "./_components/orders-section";
import { QuickActions } from "./_components/quick-actions";
import { UserInfo } from "./_components/user-info";
import { UserInterests } from "./_components/user-interests";

export default function Page() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-1 flex-col gap-4 p-8 pt-0 container max-w-5xl">
        <UserInfo />
        <div className="flex gap-6">
          <div className="w-2/3 flex flex-col gap-8">
            <OrdersSection />
            <FavoriteEvents />
            <UserInterests />
          </div>
          <aside className="w-1/3 h-full">
            {" "}
            {/* Changed to aside with h-full */}
            <QuickActions />
          </aside>
        </div>
      </div>
    </div>
  );
}
