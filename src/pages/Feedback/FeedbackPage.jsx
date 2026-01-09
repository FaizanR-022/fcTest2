import { useState } from "react";
import { Send, MessageSquare, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setFormData({ type: "", subject: "", message: "" });
    setSubmitting(false);

    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-medium mb-2">Send Feedback</h1>
          <p className="text-muted-foreground text-lg">
            We value your input! Help us improve FastConnect
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-medium">Share Your Thoughts</CardTitle>
            <CardDescription>
              Tell us about your experience, report bugs, or suggest new features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="p-4 mb-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
                Thank you for your feedback! We appreciate your input.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Feedback Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">💡 Suggestion</SelectItem>
                    <SelectItem value="bug">🐛 Bug Report</SelectItem>
                    <SelectItem value="feature">✨ Feature Request</SelectItem>
                    <SelectItem value="general">📝 General Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Brief description of your feedback"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us more about your feedback..."
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={submitting || !formData.type || !formData.subject || !formData.message}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Other Ways to Reach Us */}
        <div className="mt-8 p-6 rounded-lg bg-accent/50 border">
          <h3 className="font-medium mb-2">Other Ways to Reach Us</h3>
          <p className="text-sm text-muted-foreground mb-4">
            For urgent matters or specific inquiries, you can also contact us through:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>Email: support@fastconnect.nu.edu.pk</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>Join our community Discord server</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <span>Visit us at the Student Affairs Office</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
