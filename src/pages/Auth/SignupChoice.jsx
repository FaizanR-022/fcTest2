import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/constants";
import useAuthStore from "@/store/authStore";

export default function SignupChoice() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-semibold mb-4">Join FastConnect</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Choose your account type to get started
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Card */}
            <Card
              className="border-2 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => navigate(ROUTES.SIGNUP_STUDENT)}
            >
              <CardHeader className="pb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">I'm a Student</CardTitle>
                <CardDescription className="text-base">
                  @nu.edu.pk email required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Connect with successful alumni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Get career guidance and mentorship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Ask questions in the Q&A forum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Discover job opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Alumni Card */}
            <Card
              className="border-2 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => navigate(ROUTES.SIGNUP_ALUMNI)}
            >
              <CardHeader className="pb-4">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-secondary" />
                </div>
                <CardTitle className="text-2xl">I'm an Alumni</CardTitle>
                <CardDescription className="text-base">
                  Personal email accepted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Share your professional journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Mentor current students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Give back to the FAST community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>Expand your professional network</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <span
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-primary hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
