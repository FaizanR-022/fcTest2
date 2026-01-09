import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, RefreshCw, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/constants";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { verifyOTP, resendOTP, error, clearError } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    if (!otp) {
      setLocalError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setLocalError("OTP must be 6 digits");
      return;
    }

    if (!/^\d+$/.test(otp)) {
      setLocalError("OTP must contain only numbers");
      return;
    }

    setLoading(true);

    const result = await verifyOTP(otp);

    setLoading(false);

    if (result.success) {
      setSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1500);
    } else {
      setOtp(""); // Clear input on error
    }
  };

  const handleResendOTP = async () => {
    clearError();
    setLocalError("");
    setResending(true);

    const result = await resendOTP();

    setResending(false);

    if (result.success) {
      setResendTimer(120);
      setCanResend(false);

      setLocalError("");
      alert("New OTP sent to your email!");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setLocalError("");
      clearError();
    }
  };

  if (!user) {
    return null;
  }

  const displayError = localError || error;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground mb-1">We sent a 6-digit code to</p>
          <p className="text-primary font-semibold mb-6">{user.email}</p>

          {/* Success Message */}
          {success && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-lg">
              Email verified successfully! Redirecting...
            </div>
          )}

          {/* Error Message */}
          {displayError && (
            <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-lg">
              {displayError}
            </div>
          )}

          {/* OTP Form */}
          {!success && (
            <form onSubmit={handleVerify}>
              <div className="max-w-xs mx-auto mb-4">
                <Input
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="text-center text-3xl font-semibold tracking-widest h-14 bg-muted/50"
                  autoFocus
                  disabled={loading || resending}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <div className="max-w-xs mx-auto mb-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || resending || otp.length !== 6}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>

              {canResend ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={resending || loading}
                  className="text-primary"
                >
                  {resending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend OTP
                    </>
                  )}
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Resend OTP in{" "}
                  <span className="text-primary font-bold">
                    {formatTimer(resendTimer)}
                  </span>
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
