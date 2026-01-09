import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Search, UserCheck, ArrowRight, Target, Zap } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    navigate(ROUTES.DASHBOARD, { replace: true });
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-medium mb-6">
              Connect with FAST-NUCES Alumni
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bridge the gap between students and alumni. Get mentorship, career guidance, and build meaningful professional connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/login")} className="text-lg px-8">
                Login
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/signup")} className="text-lg px-8">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About FastConnect</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                FastConnect is a platform designed to foster meaningful connections between current students and alumni of FAST-NUCES. Our mission is to create a supportive community where knowledge, experience, and opportunities are shared freely.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Our Objective</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    To empower FAST-NUCES students with access to a network of successful alumni who can provide guidance, mentorship, and career opportunities.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    To build a thriving community that bridges the gap between academic learning and professional success through peer-to-peer knowledge sharing.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to connect, learn, and grow professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Alumni Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse and connect with alumni across various industries and locations with advanced search filters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Q&A Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ask questions, share knowledge, and get expert advice from experienced alumni in your field.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find alumni by company, location, expertise, or industry to get targeted mentorship.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create detailed profiles showcasing your academic background, skills, and professional journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple and straightforward
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* For Students */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-center">For Students</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Sign Up</h4>
                  <p className="text-sm text-muted-foreground">
                    Create your account using your @nu.edu.pk email address
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Explore</h4>
                  <p className="text-sm text-muted-foreground">
                    Browse the alumni directory and discover professionals in your field
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Connect</h4>
                  <p className="text-sm text-muted-foreground">
                    Ask questions on the forum and connect with alumni for mentorship
                  </p>
                </div>
              </div>
            </div>

            {/* For Alumni */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-center">For Alumni</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Register</h4>
                  <p className="text-sm text-muted-foreground">
                    Join the network with your professional email and create your profile
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Share</h4>
                  <p className="text-sm text-muted-foreground">
                    Showcase your journey, share insights, and answer student questions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Give Back</h4>
                  <p className="text-sm text-muted-foreground">
                    Mentor students, provide career guidance, and help shape the next generation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <Button size="lg" onClick={() => navigate("/signup")} className="gap-2">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
