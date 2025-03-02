import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    dept: "",
    classes: "",
    usc_id: "",
    interests: "",
    current_year: "",
    mentor: false
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'usc_id') {
      // Only allow numbers and limit to 10 digits
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
  
    const endpoint = isLogin ? `${API_BASE_URL}/api/users/login` : `${API_BASE_URL}/api/users/save-profile`;
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      console.log("Success:", data);
  
      if (isLogin) {
        alert("Login Successful!");


        // Store JWT or session data if needed
      } else {
        alert("Profile Created!");
      }
      // call a route
  
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className={`landing-content ${isLogin ? 'login-mode' : 'signup-mode'}`}>
          {/* Left Side - Branding & Welcome */}
          <div className="landing-left">
            <div className="logo-container">
              <img src="img/logo.png" alt="Commons Logo" className="commons-logo" />
            </div>
            <p className="brand-description">
              Connect with students in your major, find study partners, and build your academic network.
            </p>
            <div className="auth-toggle">
              <button
                className={`auth-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`auth-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="landing-right">
            <div className="auth-form-container">
              <h2>{isLogin ? 'Welcome Back!' : 'Create Your Profile'}</h2>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>Major</label>
                  <input
                    type="text"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    placeholder="Enter your Major"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>Classes</label>
                  <input
                    type="text"
                    name="classes"
                    value={formData.classes}
                    onChange={handleChange}
                    placeholder="Enter your current classes"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>USC ID</label>
                  <input
                    type="text"
                    name="usc_id"
                    value={formData.usc_id}
                    onChange={handleChange}
                    placeholder="Enter your 10-digit USC ID"
                    required={!isLogin}
                    disabled={isLogin}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit USC ID"
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>Interests</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Enter your interests (comma separated)"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <label>Current Class Standing</label>
                  <input
                    type="text"
                    name="current_year"
                    value={formData.current_year}
                    onChange={handleChange}
                    placeholder="Enter your current class standing (senior, junior...)"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>

                <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      name="mentor"
                      id="mentor"
                      checked={formData.mentor}
                      onChange={(e) => setFormData({
                        ...formData,
                        mentor: e.target.checked
                      })}
                      disabled={isLogin}
                    />
                    <label htmlFor="mentor">Sign up as a Mentor</label>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  {isLogin ? 'Login' : 'Create Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;

// import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import "./Landing.css";

// const Landing = () => {
//   // const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     major: "",
//     classes: "",
//   });

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   navigate('/home');
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent page reload
  
//     const endpoint = isLogin ? `${API_BASE_URL}/api/users/login` : `${API_BASE_URL}/api/users/save-profile`;
    
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }
  
//       console.log("Success:", data);
  
//       if (isLogin) {
//         alert("Login Successful!");
//         // Store JWT or session data if needed
//       } else {
//         alert("Profile Created!");
//       }
  
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message);
//     }
//   };
  

//   return (
//     <div className={`landing-content ${isLogin ? 'login-mode' : 'signup-mode'}`}>
//       {/* Left Side - Branding & Welcome */}
//       <div className="landing-left">
//         <div className="logo-container">
//           <img src="img/logo.png" alt="Commons Logo" className="commons-logo" />
//         </div>
//         <p className="brand-description">
//           Connect with students in your major, find study partners, and build your academic network!
//         </p>
//         <div className="auth-toggle">
//           <button
//             className={`auth-btn ${!isLogin ? 'active' : ''}`}
//             onClick={() => setIsLogin(false)}
//           >
//             Sign Up
//           </button>
//           <button
//             className={`auth-btn ${isLogin ? 'active' : ''}`}
//             onClick={() => setIsLogin(true)}
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       {/* Right Side - Auth Form */}
//       <div className="landing-right">
//         <div className="auth-form-container">
//           <h2>{isLogin ? 'Welcome Back!' : 'Create Your Profile'}</h2>
//           <form onSubmit={handleSubmit} className="auth-form">
//             <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 required={!isLogin}
//                 disabled={isLogin}
//               />
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
//               <label>Major</label>
//               <input
//                 type="text"
//                 name="major"
//                 value={formData.major}
//                 onChange={handleChange}
//                 placeholder="Enter your major"
//                 required={!isLogin}
//                 disabled={isLogin}
//               />
//             </div>

//             <div className={`form-group ${isLogin ? 'hidden' : ''}`}>
//               <label>Classes</label>
//               <input
//                 type="text"
//                 name="classes"
//                 value={formData.classes}
//                 onChange={handleChange}
//                 placeholder="Enter your current classes"
//                 required={!isLogin}
//                 disabled={isLogin}
//               />
//             </div>

//             <button type="submit" className="submit-btn">
//               {isLogin ? 'Login' : 'Create Profile'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;

