import { OrdersSection } from "./_components/orders-section";
import { QuickActions } from "./_components/quick-actions";
import { UserInfo } from "./_components/user-info";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <UserInfo />
      <div className="flex gap-4">
        <div className="w-2/3">
          <OrdersSection />
        </div>
        <div className="w-1/3">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
