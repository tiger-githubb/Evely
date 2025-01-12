import { PaymentForm } from "./_components/PaymentForm";

interface PaymentPageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { uid } = await params;
  return <PaymentForm uid={uid} />;
}
