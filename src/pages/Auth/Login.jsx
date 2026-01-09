import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Users, MessageSquare, Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/constants";
import { loginSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data) => {
    clearError();
    await login(data);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Side - Login Form */}
          <div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Login to access your FAST-NUCES Alumni Portal account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setValue("rememberMe", checked)}
                      />
                      <Label htmlFor="remember" className="text-sm cursor-pointer font-normal">
                        Remember me
                      </Label>
                    </div>
                    <span className="text-sm text-primary cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to={ROUTES.SIGNUP_CHOICE} className="text-primary hover:underline">
                      Sign up here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Info Panel */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Connect & Grow</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  Join the FAST-NUCES community and unlock opportunities for mentorship, networking, and career growth.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Access Alumni Network</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with thousands of successful alumni across the globe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Career Guidance</h4>
                    <p className="text-sm text-muted-foreground">
                      Ask questions and receive expert advice from industry professionals
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discover Opportunities</h4>
                    <p className="text-sm text-muted-foreground">
                      Find mentors, job referrals, and professional connections
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t">
                <p className="text-sm text-muted-foreground">
                  Built with ❤️ by FAST-NUCES Students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
