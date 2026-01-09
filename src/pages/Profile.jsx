import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";
import { getInitials } from "@/utils/userInfoHelpers";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-semibold mb-2">
                      {user.firstName} {user.lastName}
                    </h1>
                    {user.role === "alumni" && user.currentPosition && (
                      <p className="text-xl text-muted-foreground mb-2">
                        {user.currentPosition}
                        {user.currentCompany && ` at ${user.currentCompany}`}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {user.role === "alumni" && user.city
                          ? `${user.city}, ${user.country}`
                          : `${user.campus}, Pakistan`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {user.department} •{" "}
                        {user.role === "student"
                          ? `Batch ${user.batch}`
                          : `Class of ${user.graduationYear}`}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={user.role === "student" ? "default" : "secondary"}
                  >
                    {user.role === "student" ? "Student" : "Alumni"}
                  </Badge>
                </div>

                <Button
                  onClick={() => navigate(ROUTES.EDIT_PROFILE)}
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Experience Section (Alumni Only) */}
            {user.role === "alumni" && user.previousCompanies?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Position */}
                  {user.currentCompany && (
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">
                          {user.currentPosition}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {user.currentCompany}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Present
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Previous Companies */}
                  {user.previousCompanies.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{exp.role}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {exp.company}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {exp.from} - {exp.to}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Skills Section (Alumni Only) */}
            {user.role === "alumni" && user.skills?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Academic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{user.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Campus</p>
                    <p className="font-medium">{user.campus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {user.role === "student" ? "Batch Year" : "Graduation Year"}
                    </p>
                    <p className="font-medium">
                      {user.role === "student"
                        ? user.batch
                        : user.graduationYear}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-sm break-all">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="text-sm">{user.phone}</p>
                    </div>
                  </div>
                )}

                {user.role === "alumni" && user.city && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="text-sm">
                        {user.city}, {user.country}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.EDIT_PROFILE)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.ALL_POSTS)}
                >
                  View My Posts
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.ALUMNI_LIST)}
                >
                  Browse Alumni
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
