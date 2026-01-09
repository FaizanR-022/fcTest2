import { MapPin, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AlumniCard({ alumni, onClick }) {
  // Get previous companies display
  const maxVisiblePrevCompanies = 2;
  const visiblePrevCompanies = alumni.previousCompanies.slice(
    0,
    maxVisiblePrevCompanies
  );
  const remainingPrevCompanies =
    alumni.previousCompanies.length - maxVisiblePrevCompanies;

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
      onClick={() => onClick(alumni)}
    >
      <CardContent className="p-4 md:p-6">
        {/* Header Section */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={alumni?.profilePicture} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {alumni.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg truncate">{alumni.name}</h3>
            <p className="text-sm text-muted-foreground">
              Class of {alumni.graduationYear} • {alumni.campus}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-2 mb-4">
          {/* Current Position & Company */}
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{alumni.currentPosition}</p>
              <p className="text-sm text-muted-foreground">{alumni.company}</p>
            </div>
          </div>

          {/* Previous Companies */}
          {alumni.previousCompanies.length > 0 && (
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Previously at:</p>
                <p className="text-sm">
                  {visiblePrevCompanies.map((pc) => pc.companyName).join(", ")}
                  {remainingPrevCompanies > 0 && (
                    <span className="text-muted-foreground">
                      {" "}
                      +{remainingPrevCompanies} more
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Department */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
            <p className="text-sm">{alumni.department}</p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <p className="text-sm">{alumni.location}</p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2">Expertise:</p>
          <div className="flex flex-wrap gap-1.5">
            {alumni.expertise.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {alumni.expertise.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{alumni.expertise.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* View Profile Button - shows on hover */}
        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="w-full">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
