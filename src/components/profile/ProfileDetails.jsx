import {
  User,
  Mail,
  GraduationCap,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Linkedin,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ProfileDetails = ({ user, isOwnProfile }) => {
  if (!user) return null;

  const DetailItem = ({ icon: Icon, label, value }) => {
    if (!value) return null;

    return (
      <div className="flex items-center gap-3 py-2">
        <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground min-w-[120px]">{label}:</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    );
  };

  const ExperienceItem = ({ experience }) => (
    <div className="p-3 bg-muted/50 rounded-lg mb-2">
      <div className="flex items-center gap-2 mb-1">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        <span className="font-semibold text-foreground">{experience.position}</span>
      </div>
      <p className="text-sm text-muted-foreground ml-6">{experience.company}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-6 mt-1">
        <Calendar className="h-3 w-3" />
        <span>{experience.from} - {experience.to}</span>
      </div>
    </div>
  );

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          {/* Profile Information Header */}
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
          </div>

          {user.role === "student" && (
            <>
              <DetailItem icon={User} label="Full Name" value={user.fullName} />
              {isOwnProfile && (
                <DetailItem icon={Mail} label="Email" value={user.email} />
              )}
              <DetailItem icon={GraduationCap} label="Department" value={user.department} />
              <DetailItem icon={Building2} label="Campus" value={user.campus} />
              <DetailItem icon={Calendar} label="Batch Year" value={user.batch} />
            </>
          )}

          {user.role === "alumni" && (
            <>
              <DetailItem icon={User} label="Full Name" value={user.fullName} />
              <DetailItem icon={GraduationCap} label="Department" value={user.department} />
              <DetailItem icon={Building2} label="Campus" value={user.campus} />
              <DetailItem icon={Calendar} label="Graduation Year" value={user.graduationYear} />

              <Separator className="my-6" />

              {/* Professional Information */}
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Professional Information</h2>
              </div>

              <DetailItem icon={Building2} label="Current Company" value={user.currentCompany} />
              <DetailItem icon={Briefcase} label="Current Position" value={user.currentPosition} />
              <DetailItem
                icon={MapPin}
                label="Location"
                value={
                  user.currentCity && user.currentCountry
                    ? `${user.currentCity}, ${user.currentCountry}`
                    : user.currentCity || user.currentCountry
                }
              />
              {user.linkedin && (
                <div className="flex items-center gap-3 py-2">
                  <Linkedin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground min-w-[120px]">LinkedIn:</span>
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}

              {/* Previous Experience */}
              {user.previousExperiences && user.previousExperiences.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Previous Experience</h2>
                  </div>
                  {user.previousExperiences.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} />
                  ))}
                </>
              )}

              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Skills & Expertise</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
