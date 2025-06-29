import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import NavBar from "../components/navBar";
import RegistrationWizard from "../components/RegistrationWizard";
import OrganizerPage from "./OrganizerPage";  // import new organizer page

export default function Profile() {
  const { user } = useContext(AppContext);

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <NavBar />
      {user.role === "Service-provider" && <RegistrationWizard />}
      {user.role === "Organizer" && <OrganizerPage />}
      {/* You can add other roles here as needed */}
    </>
  );
}
