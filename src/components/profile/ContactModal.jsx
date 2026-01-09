import { useState } from "react";
import { X, Mail, Phone, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ContactModal = ({ open, onClose, user }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = async () => {
    if (user?.email) {
      await navigator.clipboard.writeText(user.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = async () => {
    if (user?.phone) {
      await navigator.clipboard.writeText(user.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Contact Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground truncate">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyEmail}
              className="flex-shrink-0"
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Phone */}
          {user.phone && (
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyPhone}
                className="flex-shrink-0"
              >
                {copiedPhone ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
