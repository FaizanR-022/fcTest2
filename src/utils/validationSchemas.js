import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const studentSignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/,
      "Please use your @nu.edu.pk email address"
    )
    .required("University email is required"),
  campus: yup.string().required("Campus is required"),
  department: yup.string().required("Department is required"),
  batch: yup
    .number()
    .required("Batch year is required")
    .min(2000, "Invalid batch year")
    .max(new Date().getFullYear() + 5, "Invalid batch year"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  profilePicture: yup.string().url("Please enter a valid URL").notRequired(),
});

export const alumniSignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  phone: yup
    .string()
    // to avoid validating empty strings
    .nullable()
    .transform((value, originalValue) => {
      // If empty string, return null so it doesn't validate
      return originalValue === "" ? null : value;
    })
    .notRequired()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    ),
  campus: yup.string().required("Campus is required"),
  department: yup.string().required("Department is required"),
  graduationYear: yup
    .number()
    .required("Graduation year is required")
    .min(2000, "Invalid graduation year")
    .max(new Date().getFullYear(), "Graduation year cannot be in the future"),
  currentCompany: yup
    .string()
    .required("Current company is required")
    .min(2, "Company name must be at least 2 characters"),
  currentPosition: yup
    .string()
    .required("Current position is required")
    .min(2, "Position must be at least 2 characters"),
  previousCompanies: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required("Company name is required"),
        role: yup.string().required("Role is required"),
        from: yup
          .number()
          .required("Start year is required")
          .min(2000, "Invalid year")
          .max(new Date().getFullYear(), "Year cannot be in the future"),
        to: yup
          .number()
          .required("End year is required")
          .min(2000, "Invalid year")
          .max(new Date().getFullYear(), "Year cannot be in the future")

          // test (name, message, testFunction)
          .test(
            "is-greater",
            "End year must be after start year",
            function (value) {
              const { from } = this.parent;
              return value >= from;
            }
          ),
      })
    )
    .notRequired(),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  profilePicture: yup.string().url("Please enter a valid URL").notRequired(),
});
