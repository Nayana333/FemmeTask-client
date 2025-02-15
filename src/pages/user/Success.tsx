"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
export default function SuccessPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          navigate("/login")
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const handleLoginClick = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282d49] text-gray-100">
      <div className="w-full max-w-md p-8 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-xl text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
        <h1 className="text-3xl font-bold mb-6">Welcome to FemmeTask!</h1>
        <p className="text-xl mb-8 text-gray-300">Your account has been successfully verified.</p>
        <Button onClick={handleLoginClick} className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 mb-4">
          Go to Login
        </Button>
        <p className="text-sm text-gray-400">Redirecting to login page in {countdown} seconds...</p>
      </div>
    </div>
  )
}

