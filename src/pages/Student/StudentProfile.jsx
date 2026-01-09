import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageUpload from "@/components/common/ImageUpload";

import { updateStudentProfileSchema } from "@/utils/profileValidationSchemas";
import { userService } from "@/services/userService";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";

export default function StudentProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateStudentProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getUserProfile();

        reset({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          profilePicture: data.user.profilePicture || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const result = await userService.updateUserProfile(data);
      updateUser(result.user);
      setSuccess("Profile updated successfully!");

      setTimeout(() => {
        navigate(ROUTES.ALUMNI_LIST);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>

          <CardContent>
            <Separator className="mb-6" />

            {/* Alerts */}
            {error && (
              <div className="p-3 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 mb-6 text-sm text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-lg">
                {success}
              </div>
            )}

            {/* Read-only Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p>{user?.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Campus</p>
                  <p>{user?.campus}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Batch Year</p>
                  <p>{user?.batch}</p>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Editable Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-sm font-semibold text-muted-foreground">Editable Information</h3>

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName.message}</p>
                )}
              </div>

              <Controller
                name="profilePicture"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Profile Picture (Optional)"
                  />
                )}
              />

              <Button type="submit" className="w-full" disabled={submitting || !isDirty}>
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              {!isDirty && (
                <p className="text-xs text-center text-muted-foreground">
                  Make changes to enable the save button
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
