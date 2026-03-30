import { useAuth } from "@/hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import JobSeekerDashboard from "./JobSeekerDashboard";
import HRDashboard from "./HRDashboard";
import MentorDashboard from "./MentorDashboard";

const DashboardIndex = () => {
  const { role } = useAuth();

  switch (role) {
    case "job_seeker":
      return <JobSeekerDashboard />;
    case "hr_recruiter":
      return <HRDashboard />;
    case "mentor":
      return <MentorDashboard />;
    case "student":
    default:
      return <StudentDashboard />;
  }
};

export default DashboardIndex;
