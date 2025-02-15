
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const features = [
  "Efficient task management",
  "Real-time collaboration",
  "Flexible scheduling options",
  "Powerful productivity tracking",
  "Cross-platform sync",
]




export default function LandingPage() {
  const navigate=useNavigate()

  const handleNavigation = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };


  const selectUser = (state: any) => state.auth.user?.user;
  const user = useSelector(selectUser);
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-extrabold text-[#f4a261]">FemmeTask</h1>
          </motion.div>
          <motion.div
            className="flex space-x-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
           <a href="/login">
      <Button variant="outline" className="bg-gray-900 text-white border-gray-700 hover:bg-gray-700">
        Sign In
      </Button>
    </a>
    <a href="/signUp">
    <Button className="bg-blue-600 text-white hover:bg-blue-700">
      Sign Up
    </Button>
  </a>
</motion.div>
        </nav>

        <main className="text-center">
          <motion.h2
            className="text-4xl font-semibold mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Master Your Tasks with Ease
          </motion.h2>
          <motion.p
            className="text-lg mb-10 text-gray-200"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Achieve more with an all-in-one productivity tool.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 bg-gray-800 p-5 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <CheckCircle className="text-yellow-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
      <Button 
  variant="outline" 
  className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
  onClick={handleNavigation}
>
  Start Now
</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Learn More</Button>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
