"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CheckoutSummaryProps {
  onConfirm: () => void;
}

export function CheckoutSummary({ onConfirm }: CheckoutSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="p-4">{/* Display order summary */}</Card>
      <Button className="w-full" onClick={onConfirm}>
        Confirmer et payer
      </Button>
    </div>
  );
}
