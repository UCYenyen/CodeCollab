import React from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Spinner className="h-10 w-10 text-primary" />
        <p className="text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}
