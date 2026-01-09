export const extractRollNumber = (email) => {
  if (!email || !email.includes("@nu.edu.pk")) {
    return null;
  }

  const username = email.split("@")[0];
  if (username.length < 7) {
    return null; // Invalid format
  }

  const campusLetter = username[0].toUpperCase(); // k -> K
  const year = username.substring(1, 3); // 23
  const studentNumber = username.substring(3); // 0834

  return `${year}${campusLetter}-${studentNumber}`; // 23K-0834
};

export const formatStudentInfo = (email) => {
  return extractRollNumber(email);
};

export const formatAlumniInfo = (position, company) => {
  if (!position && !company) return null;
  if (!position) return company;
  if (!company) return position;
  return `${position} at ${company}`;
};

export const getInitials = (firstName, lastName) => {
  const first = firstName?.[0] || "";
  const last = lastName?.[0] || "";
  return `${first}${last}`.toUpperCase();
};
