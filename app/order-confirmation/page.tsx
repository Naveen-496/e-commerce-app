import { Suspense } from 'react'
import { OrderConfirmationContent } from '@/components/OrderConfirmationContent'

function OrderConfirmationSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="h-16 w-16 bg-muted rounded-full mx-auto mb-6 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationSkeleton />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
