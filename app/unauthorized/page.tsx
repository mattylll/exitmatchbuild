import Link from 'next/link'
import { ShieldX } from 'lucide-react'
import { Button } from '@/components/Button/Button'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ShieldX className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            This page requires special permissions that your account doesn't currently have.
          </p>
          <div className="space-y-2">
            <Button href="/" variant="outline" className="w-full">
              Return Home
            </Button>
            <Button href="/contact" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}