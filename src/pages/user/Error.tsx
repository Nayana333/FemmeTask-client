import { useEffect } from "react"
import { useRouteError } from "react-router-dom"
import { XCircle } from "lucide-react"

export default function ErrorPage() {
  const error = useRouteError() as Error & { digest?: string }

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#282d49] text-white">
      <div className="text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-4xl font-bold">Oops! Something went wrong</h1>
        <p className="mt-2 text-lg">We're sorry, but an error occurred while processing your request.</p>
        <div className="mt-6 space-x-4">
          <a
            href="/"
            className="inline-block rounded-lg bg-transparent px-4 py-2 text-white font-semibold border border-white transition-colors hover:bg-white hover:text-[#282d49]"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  )
}
