import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DEPARTMENTS, BATCH_YEARS, CAMPUSES } from "@/constants/authConstants";
import { studentSignupSchema } from "@/utils/validationSchemas";
import { ROUTES } from "@/constants/constants";
import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import ImageUpload from "@/components/common/ImageUpload";

export default function SignupStudent() {
  const { signupStudent, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(studentSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      campus: "",
      department: "",
      batch: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const onSubmit = async (data) => {
    clearError();
    console.log(data);
    const result = await signupStudent(data);
    if (result.success) {
      reset();
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Student Registration</CardTitle>
          <CardDescription>
            Create your account using your @nu.edu.pk email address
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
              <Label htmlFor="email">University Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="your.name@nu.edu.pk"
                    className={errors.email ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.email ? (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              ) : (
                <p className="text-xs text-muted-foreground">Must be a valid @nu.edu.pk email</p>
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

            {/* Department & Batch Year */}
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
                <Label>Batch Year</Label>
                <Controller
                  name="batch"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.batch ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BATCH_YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.batch && (
                  <p className="text-xs text-destructive">{errors.batch.message}</p>
                )}
              </div>
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
              {isSubmitting ? "Creating Account..." : "Create Student Account"}
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
