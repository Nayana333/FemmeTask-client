import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { postOtp, postResendOtp } from "../../services/api/user/apiMethods";
import { useLocation, useNavigate } from "react-router-dom";

export default function OTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setResend(true);
          toast.error("Time expired, please resend OTP");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (timer === 0) {
      toast.info("OTP has expired, please resend");
      return;
    }

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Enter a valid 4-digit OTP");
      return;
    }

    const storedEmail = localStorage.getItem("userEmail") || emailFromQuery;

    if (!storedEmail) {
      toast.error("Email is missing. Please sign up again.");
      return;
    }

    postOtp(storedEmail, otpString) 
      .then((response: any) => {
        if (response.status === 200) {
          toast.success("OTP Verified Successfully");
          localStorage.removeItem("userEmail");
          navigate("/success");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Verification failed");
      });
  };

  const handleResendClick = () => {
    setOtp(["", "", "", ""]);
    setResend(false);
    setTimer(60);

    const storedEmail = localStorage.getItem("userEmail") || emailFromQuery;

    if (!storedEmail) {
      toast.error("Email is missing. Please sign up again.");
      return;
    }

    postResendOtp({ email: storedEmail })
      .then(() => {
        toast.success("OTP has been resent");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Resend failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282d49] text-gray-100">
      <div className="w-full max-w-md p-8 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Enter OTP</h1>
        <p className="text-center mb-8 text-gray-300">
          We've sent a code to {emailFromQuery || "your email"}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-1 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-all"
              />
            ))}
          </div>
          <p className="text-center text-sm mb-4">Expires in {timer} seconds</p>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
            Verify OTP
          </Button>
        </form>
        {resend && (
          <p className="mt-6 text-center text-sm">
            Didn't receive the OTP?{" "}
            <button onClick={handleResendClick} className="text-blue-400 hover:underline">
              Resend OTP
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
