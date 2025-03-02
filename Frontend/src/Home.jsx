import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState({
    department: 'All Departments',
    class: 'All Classes',
    mentor: false
  });

  // Mock departments and classes for filters
  const availableDepartments = ["All Departments", "Neuroscience", "Global Health", "Computer Science", "Business", "Psychology"];
  const availableClasses = ["All Classes", "BISC 408", "CSCI 401", "PSYC 355", "BUAD 302"];

  // Mock data for top recommendations
  const topRecommendations = [
    {
      first_name: "ANAAYA",
      last_name: "MEHRA",
      current_year: "Senior",
      dept: "NEUROSCIENCE",
      classes: "BISC 408",
      interests: ["Concerts", "Eating out", "Road trips"],
      image: "img/user.png",
      mentor: false
    },
    {
      first_name: "JOHN",
      last_name: "SMITH",
      current_year: "Senior",
      dept: "COMPUTER SCIENCE",
      classes: "CSCI 401",
      interests: ["Programming", "Gaming", "Music"],
      image: "img/user.png",
      mentor: true
    },
    {
      first_name: "EMMA",
      last_name: "WILSON",
      current_year: "Junior",
      dept: "PSYCHOLOGY",
      classes: "PSYC 355",
      interests: ["Research", "Reading", "Photography"],
      image: "img/user.png",
      mentor: false
    }
  ];

  // Mock data for other users
  const otherUsers = [
    {
      first_name: "Sarah",
      last_name: "Chen",
      current_year: "Junior",
      dept: "COMPUTER SCIENCE",
      classes: "CSCI 401",
      interests: ["Coding", "Gaming", "Coffee"],
      image: "img/user.png",
      mentor: true
    },
    {
      first_name: "Michael",
      last_name: "Park",
      current_year: "Senior",
      dept: "BUSINESS",
      classes: "BUAD 302",
      interests: ["Startups", "Reading", "Tennis"],
      image: "img/user.png",
      mentor: false
    },
    {
      first_name: "Emily",
      last_name: "Rodriguez",
      current_year: "Sophomore",
      dept: "PSYCHOLOGY",
      classes: "PSYC 355",
      interests: ["Research", "Hiking", "Photography"],
      image: "img/user.png",
      mentor: true
    },
    {
      first_name: "James",
      last_name: "Wilson",
      current_year: "Junior",
      dept: "GLOBAL HEALTH",
      classes: "BISC 408",
      interests: ["Volunteering", "Travel", "Music"],
      image: "img/user.png",
      mentor: false
    },
    {
      first_name: "Sophia",
      last_name: "Kim",
      current_year: "Senior",
      dept: "COMPUTER SCIENCE",
      classes: "CSCI 401",
      interests: ["AI", "Art", "Running"],
      image: "img/user.png",
      mentor: true
    },
    {
      first_name: "David",
      last_name: "Thompson",
      current_year: "Junior",
      dept: "NEUROSCIENCE",
      classes: "BISC 408",
      interests: ["Research", "Basketball", "Cooking"],
      image: "img/user.png",
      mentor: false
    }
  ];

  const CommonCard = ({ user }) => (
    <div className={`commons-card ${user.mentor ? 'mentor-card' : ''}`}>
      <div className="card-header">
        {user.mentor && <img src="img/mentor.png" alt="Mentor" className="mentor-badge" />}
        <img 
          src={user.image} 
          alt={`${user.first_name} ${user.last_name}`} 
          className="profile-image"
        />
        <span className="year-tag">{user.current_year}</span>
      </div>
      <div className="profile-info">
        <h3 className="profile-name">{user.first_name} {user.last_name}</h3>
        <div className="tags-container">
          <span className="tag">{user.dept}</span>
        </div>
        <div className="profile-details">
          <p className="profile-detail">
            <strong>Classes:</strong> {user.classes}
          </p>
          <p className="profile-detail">
            <strong>Interests:</strong> {user.interests.join(", ")}
          </p>
        </div>
      </div>
      <button className="add-common-btn">REQUEST</button>
    </div>
  );

  const handleFilter = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    
    return otherUsers.filter(user => {
      if (newFilters.mentor && !user.mentor) return false;
      if (newFilters.department !== "All Departments" && 
          user.dept.toUpperCase() !== newFilters.department.toUpperCase()) return false;
      if (newFilters.class !== "All Classes" && user.classes !== newFilters.class) return false;
      return true;
    });
  };

  const [filteredUsers, setFilteredUsers] = useState(otherUsers);

  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <div className="top-recommendations">
          <h1 className="section-title">YOUR TOP COMMONS....</h1>
          <p className="section-subtitle">based on your profile</p>
          <div className="commons-grid">
            {topRecommendations.map((user, index) => (
              <CommonCard key={index} user={user} />
            ))}
          </div>
        </div>

        <div className="section-divider">see more</div>

        <div className="filter-section">
          <aside className="filter-sidebar">
            <h2 className="filter-title">FILTER BY:</h2>
            <div className="filter-group">
              <label className="filter-label">
                <input 
                  type="checkbox" 
                  checked={filters.mentor} 
                  onChange={(e) => setFilteredUsers(handleFilter('mentor', e.target.checked))}
                />
                mentor
              </label>
            </div>
            <div className="filter-group">
              <h3>department</h3>
              <select 
                className="filter-select"
                value={filters.department}
                onChange={(e) => setFilteredUsers(handleFilter('department', e.target.value))}
              >
                {availableDepartments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <h3>classes</h3>
              <select 
                className="filter-select"
                value={filters.class}
                onChange={(e) => setFilteredUsers(handleFilter('class', e.target.value))}
              >
                {availableClasses.map((className, index) => (
                  <option key={index} value={className}>{className}</option>
                ))}
              </select>
            </div>
          </aside>

          <div className="filter-content">
            <div className="commons-grid">
              {filteredUsers.map((user, index) => (
                <CommonCard key={index} user={user} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
