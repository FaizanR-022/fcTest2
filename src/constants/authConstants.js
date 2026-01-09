export const DEPARTMENTS = [
  { value: "cs", label: "Computer Science" },
  { value: "se", label: "Software Engineering" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "ds", label: "Data Science" },
  { value: "cys", label: "Cyber Security" },
  { value: "ft", label: "FinTech" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "ba", label: "Business Administration" },
];

export const CAMPUSES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Peshawar",
  "Faisalabad",
];

const currentYear = new Date().getFullYear();
export const YEARS = Array.from(
  { length: currentYear - 2000 + 1 },
  (_, i) => currentYear - i
);

// for students
export const BATCH_YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

// for alumnis
export const GRADUATION_YEARS = Array.from(
  { length: currentYear - 2000 + 1 },
  (_, i) => currentYear - i
);

export const INFO_CONTENT = {
  login: {
    title: "Connect. Network. Grow.",
    description:
      "The FAST-NUCES Alumni Portal is your gateway to a thriving professional network. Whether you're seeking mentorship, career advice, or looking to give back to the community, this platform connects you with the right people.",
    features: {
      title: "Why Join Us?",
      items: [
        "Access to a diverse network of FAST-NUCES alumni",
        "Career development and mentorship opportunities",
        "Stay updated with university and alumni events",
        "Contribute to the growth of future generations",
      ],
    },
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #059669 100%)",
  },

  studentSignup: {
    title: "Connect with Alumni",
    description:
      "As a student, you'll gain access to a network of successful FAST-NUCES alumni who are ready to guide you in your career journey.",
    features: {
      title: "Student Benefits:",
      items: [
        "Connect with alumni in your field of interest",
        "Get career guidance and mentorship",
        "Explore internship and job opportunities",
        "Learn from real-world experiences",
      ],
    },
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #14b8a6 100%)",
  },

  alumniSignup: {
    title: "Give Back to the Community",
    description:
      "As an alumni, you have the opportunity to mentor students, share your experiences, and help shape the future of FAST-NUCES graduates.",
    features: {
      title: "Alumni Benefits:",
      items: [
        "Mentor aspiring students in your field",
        "Share job opportunities and internships",
        "Build your professional network",
        "Stay connected with your alma mater",
      ],
    },
    gradient: "linear-gradient(135deg, #0d9488 0%, #059669 50%, #047857 100%)",
  },
};
