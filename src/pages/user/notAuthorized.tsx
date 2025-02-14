import { ShieldX } from "lucide-react"

export default function NotAuthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#282d49] text-white">
      <div className="text-center">
        <ShieldX className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-4 text-4xl font-bold">401 - Not Authorized</h1>
        <p className="mt-2 text-lg">Sorry, you don't have permission to access this page.</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-white px-4 py-2 text-[#282d49] font-semibold transition-colors hover:bg-gray-200"
        >
          Return to home
        </a>
      </div>
    </div>
  )
}

