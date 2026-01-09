import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserPlus, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CAMPUSES,
  DEPARTMENTS,
  GRADUATION_YEARS,
  YEARS,
} from "@/constants/authConstants";
import { alumniSignupSchema } from "@/utils/validationSchemas";
import { ROUTES } from "@/constants/constants";
import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import ImageUpload from "@/components/common/ImageUpload";

export default function SignupAlumni() {
  const { signupAlumni, error, clearError } = useAuth();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((val) => !val);
  const handleShowConfirmPassword = () => setShowConfirmPassword((val) => !val);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(alumniSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      campus: "",
      department: "",
      graduationYear: "",
      currentCompany: "",
      currentPosition: "",
      previousCompanies: [],
      city: "",
      country: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousCompanies",
  });

  const onSubmit = async (data) => {
    clearError();
    console.log(data);
    const result = await signupAlumni(data);
    if (result.success) {
      reset();
    }
  };

  const addPreviousCompany = () => {
    append({ company: "", role: "", from: "", to: "" });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Alumni Registration</CardTitle>
          <CardDescription>
            Join as an alumni and help guide the next generation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}

            {/* First Name & Last Name */}
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
                      placeholder="John"
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
                      placeholder="Doe"
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
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

            {/* Campus */}
            <div className="space-y-2">
              <Label>Campus</Label>
              <Controller
                name="campus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.campus ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMPUSES.map((camp) => (
                        <SelectItem key={camp} value={camp}>
                          {camp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.campus && (
                <p className="text-xs text-destructive">{errors.campus.message}</p>
              )}
            </div>

            {/* Department & Graduation Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.department && (
                  <p className="text-xs text-destructive">{errors.department.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Graduation Year</Label>
                <Controller
                  name="graduationYear"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.graduationYear ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADUATION_YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.graduationYear && (
                  <p className="text-xs text-destructive">{errors.graduationYear.message}</p>
                )}
              </div>
            </div>

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
                      placeholder="e.g., Google"
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
                      placeholder="e.g., Software Engineer"
                      className={errors.currentPosition ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.currentPosition && (
                  <p className="text-xs text-destructive">{errors.currentPosition.message}</p>
                )}
              </div>
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="city"
                      placeholder="e.g., San Francisco"
                      className={errors.city ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="country"
                      placeholder="e.g., USA"
                      className={errors.country ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.country && (
                  <p className="text-xs text-destructive">{errors.country.message}</p>
                )}
              </div>
            </div>

            {/* Previous Companies Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold">Previous Companies (Optional)</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addPreviousCompany}
                  className="text-primary"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Company
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative p-4 pt-8 mb-3 border rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 p-1 text-destructive hover:bg-destructive/10 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Controller
                        name={`previousCompanies.${index}.company`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Company name"
                            className={errors.previousCompanies?.[index]?.company ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.previousCompanies?.[index]?.company && (
                        <p className="text-xs text-destructive">
                          {errors.previousCompanies[index].company.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Controller
                        name={`previousCompanies.${index}.role`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Your role"
                            className={errors.previousCompanies?.[index]?.role ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.previousCompanies?.[index]?.role && (
                        <p className="text-xs text-destructive">
                          {errors.previousCompanies[index].role.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>From</Label>
                        <Controller
                          name={`previousCompanies.${index}.from`}
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={errors.previousCompanies?.[index]?.from ? "border-destructive" : ""}>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {YEARS.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.previousCompanies?.[index]?.from && (
                          <p className="text-xs text-destructive">
                            {errors.previousCompanies[index].from.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>To</Label>
                        <Controller
                          name={`previousCompanies.${index}.to`}
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={errors.previousCompanies?.[index]?.to ? "border-destructive" : ""}>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {YEARS.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.previousCompanies?.[index]?.to && (
                          <p className="text-xs text-destructive">
                            {errors.previousCompanies[index].to.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

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

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={errors.password ? "border-destructive pr-10" : "pr-10"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handleShowConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Alumni Account"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-primary hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
