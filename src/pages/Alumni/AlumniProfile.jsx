import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Plus, Trash2, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateAlumniProfileSchema } from "../../utils/profileValidationSchemas";
import { userService } from "../../services/userService";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import { YEARS } from "../../constants/authConstants";
import Loader from "../../components/common/Loader";
import ImageUpload from "../../components/common/ImageUpload";

export default function AlumniProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateAlumniProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      currentCompany: "",
      currentPosition: "",
      currentCity: "",
      currentCountry: "",
      linkedin: "",
      profilePicture: "",
      previousExperiences: [],
      skills: [],
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "previousExperiences",
  });

  const skills = watch("skills") || [];

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getUserProfile();

        // Pre-fill form with current data
        reset({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
          currentCompany: data.user.currentCompany || "",
          currentPosition: data.user.currentPosition || "",
          currentCity: data.user.currentCity || "",
          currentCountry: data.user.currentCountry || "",
          linkedin: data.user.linkedIn || "",
          profilePicture: data.user.profilePicture || "",
          previousExperiences: data.user.previousExperiences || [],
          skills: data.user.skills || [],
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

      // Update Zustand store with new user data
      updateUser(result.user);

      setSuccess("Profile updated successfully!");

      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(ROUTES.ALUMNI_LIST);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name === newSkill.trim())) {
      setValue("skills", [...skills, { name: newSkill.trim() }], {
        shouldDirty: true,
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-6 md:py-12">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Update your professional information
              </p>
            </div>

            <Separator className="mb-6" />

            {/* Alerts */}
            {error && (
              <div className="p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 mb-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
                {success}
              </div>
            )}

            {/* Read-only Info */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-muted-foreground mb-3">
                Account Information
              </p>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-muted-foreground">Email</span>
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Department</span>
                  <p className="text-sm font-medium">{user?.department}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Campus</span>
                  <p className="text-sm font-medium">{user?.campus}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Graduation Year</span>
                  <p className="text-sm font-medium">{user?.graduationYear}</p>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Editable Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm font-semibold text-muted-foreground mb-4">
                Personal Information
              </p>

              <div className="space-y-6">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="phone"
                        placeholder="+92 300 1234567"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <Separator />

                <p className="text-sm font-semibold text-muted-foreground">
                  Current Position
                </p>

                {/* Current Company & Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentCompany">Current Company</Label>
                    <Controller
                      name="currentCompany"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="currentCompany"
                          className={errors.currentCompany ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.currentCompany && (
                      <p className="text-xs text-destructive">{errors.currentCompany.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPosition">Current Position</Label>
                    <Controller
                      name="currentPosition"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="currentPosition"
                          className={errors.currentPosition ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.currentPosition && (
                      <p className="text-xs text-destructive">{errors.currentPosition.message}</p>
                    )}
                  </div>
                </div>

                {/* Current City & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentCity">Current City</Label>
                    <Controller
                      name="currentCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="currentCity"
                          className={errors.currentCity ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.currentCity && (
                      <p className="text-xs text-destructive">{errors.currentCity.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCountry">Current Country</Label>
                    <Controller
                      name="currentCountry"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="currentCountry"
                          className={errors.currentCountry ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.currentCountry && (
                      <p className="text-xs text-destructive">{errors.currentCountry.message}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Previous Experiences */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                      Previous Experience
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        appendExperience({
                          company: "",
                          position: "",
                          from: "",
                          to: "",
                        })
                      }
                      className="gap-1 text-primary"
                    >
                      <Plus className="h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>

                  {experienceFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative p-4 mb-4 border rounded-lg bg-muted/30"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Company Name</Label>
                          <Controller
                            name={`previousExperiences.${index}.company`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                className={
                                  errors.previousExperiences?.[index]?.company
                                    ? "border-destructive"
                                    : ""
                                }
                              />
                            )}
                          />
                          {errors.previousExperiences?.[index]?.company && (
                            <p className="text-xs text-destructive">
                              {errors.previousExperiences[index].company.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Controller
                            name={`previousExperiences.${index}.position`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                className={
                                  errors.previousExperiences?.[index]?.position
                                    ? "border-destructive"
                                    : ""
                                }
                              />
                            )}
                          />
                          {errors.previousExperiences?.[index]?.position && (
                            <p className="text-xs text-destructive">
                              {errors.previousExperiences[index].position.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>From</Label>
                            <Controller
                              name={`previousExperiences.${index}.from`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value?.toString() || ""}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={
                                      errors.previousExperiences?.[index]?.from
                                        ? "border-destructive"
                                        : ""
                                    }
                                  >
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {YEARS.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>To</Label>
                            <Controller
                              name={`previousExperiences.${index}.to`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value?.toString() || ""}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className={
                                      errors.previousExperiences?.[index]?.to
                                        ? "border-destructive"
                                        : ""
                                    }
                                  >
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {YEARS.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-4">
                    Skills & Expertise
                  </p>

                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleSkillKeyPress}
                      placeholder="e.g., React, Node.js"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addSkill}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[50px]">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 gap-1 pr-1"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                  <Controller
                    name="linkedin"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="linkedin"
                        placeholder="https://linkedin.com/in/yourprofile"
                        className={errors.linkedin ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.linkedin && (
                    <p className="text-xs text-destructive">{errors.linkedin.message}</p>
                  )}
                </div>

                {/* Profile Picture */}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting || !isDirty}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>

                {!isDirty && (
                  <p className="text-xs text-center text-muted-foreground">
                    Make changes to enable the save button
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
