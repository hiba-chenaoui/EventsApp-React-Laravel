import React from 'react';
import '../styles/FeaturesSection.css'; // Import your CSS file for styling

const roles = [
  {
    title: "Join as a Service Provider",
    subtitle: "Offer your skills for unforgettable events",
    description: "Whether you're a caterer, decorator, or entertainer, connect with event organizers who need your services.",
    button: "Start offering →",
    image: "/images/studio.jpeg",
    reverse: false,
  },
  {
    title: "Become an Event Organizer",
    subtitle: "Plan and manage with ease",
    description: "Create events, hire trusted service providers, and keep everything organized in one place.",
    button: "Start organizing →",
    image: "/images/téléchargement (2).jpeg",
    reverse: true,
  },
  {
    title: "Join as an Attendee",
    subtitle: "Discover and join amazing events",
    description: "Explore events, RSVP, and enjoy unforgettable experiences. Stay informed with real-time updates.",
    button: "Browse events →",
    image: "/images/Exquisite.jpeg",
    reverse: false,
  }
];

const RolesShowcase = () => {
  return (
    <section className="roles-section">
      {roles.map((role, index) => (
        <div
          key={index}
          className={`role-row ${role.reverse ? 'reverse' : ''}`}
        >
          <div className="role-image">
            <img src={role.image} alt={role.title} />
          </div>
          <div className="role-text">
            <h2>{role.title}</h2>
            <h4>{role.subtitle}</h4>
            <p>{role.description}</p>
            <a href="#" className="role-button">{role.button}</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RolesShowcase;
