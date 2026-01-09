import { Mail, Phone, MapPin, Briefcase, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/utils/userInfoHelpers";

export function AlumniDetailModal({ alumni, open, onClose }) {
  if (!alumni) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="sr-only">Alumni Profile</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={alumni.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(alumni.firstName, alumni.lastName) ||
                    alumni.name?.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-1">{alumni.name}</h2>
                {alumni.currentPosition && (
                  <p className="text-lg text-muted-foreground">
                    {alumni.currentPosition}
                    {alumni.company && ` at ${alumni.company}`}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">Alumni</Badge>
                  <span className="text-sm text-muted-foreground">
                    Class of {alumni.graduationYear}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Academic Info */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Academic Background
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium">{alumni.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Campus</p>
                  <p className="font-medium">{alumni.campus}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Graduation Year</p>
                  <p className="font-medium">{alumni.graduationYear}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Current Position */}
            {alumni.currentPosition && (
              <>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Current Position
                  </h3>
                  <div className="p-4 border rounded-lg bg-accent/30">
                    <p className="font-medium">{alumni.currentPosition}</p>
                    {alumni.company && (
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <Building className="w-4 h-4" />
                        {alumni.company}
                      </p>
                    )}
                    {alumni.location && (
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {alumni.location}
                      </p>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Previous Experience */}
            {alumni.previousCompanies?.length > 0 && (
              <>
                <div>
                  <h3 className="font-semibold mb-3">Previous Experience</h3>
                  <div className="space-y-3">
                    {alumni.previousCompanies.map((exp, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.companyName}
                        </p>
                        {exp.duration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {exp.duration.from} - {exp.duration.to}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Skills */}
            {alumni.expertise?.length > 0 && (
              <>
                <div>
                  <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {alumni.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {alumni.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${alumni.email}`}
                      className="text-primary hover:underline"
                    >
                      {alumni.email}
                    </a>
                  </div>
                )}
                {alumni.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${alumni.phone}`}
                      className="text-primary hover:underline"
                    >
                      {alumni.phone}
                    </a>
                  </div>
                )}
                {alumni.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{alumni.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
