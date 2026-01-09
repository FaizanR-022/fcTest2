import * as yup from "yup";

export const updateStudentProfileSchema = yup.object().shape({
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

  profilePicture: yup.string().url("Please enter a valid URL").notRequired(),
});

export const updateAlumniProfileSchema = yup.object().shape({
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

  phone: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .notRequired()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    ),

  currentCompany: yup
    .string()
    .required("Current company is required")
    .min(2, "Company name must be at least 2 characters"),

  currentPosition: yup
    .string()
    .required("Current position is required")
    .min(2, "Position must be at least 2 characters"),

  currentCity: yup.string().required("City is required"),

  currentCountry: yup.string().required("Country is required"),

  linkedin: yup.string().url("Please enter a valid URL").notRequired(),

  profilePicture: yup.string().url("Please enter a valid URL").notRequired(),

  previousExperiences: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().notRequired(),
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

  skills: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().notRequired(),
        name: yup
          .string()
          .min(2, "Skill name must be at least 2 characters")
          .required("Skill name is required"),
      })
    )
    .notRequired(),
});
