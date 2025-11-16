import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to get user data from Redux
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Assuming you'll use axios for API calls
import { BASE_URL } from "../utils/constants"; // Assuming BASE_URL is defined
import { useDispatch } from "react-redux"; // Import useDispatch to update Redux state
import { addUserInfo } from "../utils/userSlice"; // Import action to update user info

const EditProfile = () => {
  const currentUser = useSelector((state) => state.userInfo.userInfo); // Get current user data from Redux
  const navigate = useNavigate(); // Initialize navigate hook
  const dispatch = useDispatch(); // Initialize dispatch hook

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profileImg: "", // Changed from photoUrl to profileImg to match user object
    age: "",
    gender: "",
    about: "",
    skills: [], // Added skills for editing
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading

  // Prefill form data from Redux user when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        profileImg: currentUser.profileImg || "",
        age: currentUser.age || "",
        gender: currentUser.gender || "",
        about: currentUser.about || "",
        skills: currentUser.skills || [],
      });
    }
  }, [currentUser]); // Re-run effect if currentUser changes

  const validate = () => {
    let err = {};

    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim()) err.lastName = "Last name is required";
    if (form.profileImg && !form.profileImg.startsWith("http"))
      err.profileImg = "Invalid URL. Must start with http/https";
    if (!form.age || form.age < 1 || form.age > 120)
      err.age = "Enter a valid age between 1 and 120";
    if (!form.gender) err.gender = "Please select your gender";
    if (form.about.length < 10)
      err.about = "About section must be at least 10 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    // Convert comma-separated string to an array of trimmed strings
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setForm({ ...form, skills: skillsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true); // Set loading state

    try {
      // Replace with your actual API call to update the profile
      const res = await axios.put(BASE_URL + '/profile/update', form, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res.data)); // Update Redux state with new user info
      navigate('/profile'); // Navigate back to the profile page after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to display an error message to the user
      setErrors(prev => ({ ...prev, api: "Failed to update profile. Please try again." }));
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleCancel = () => {
    navigate('/profile'); // Navigate back to the profile page without saving
  };

  // Display a loading message if user data is not yet available
  if (!currentUser) {
    return <div className="text-center mt-10 text-white text-lg">Loading user data for editing...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-base-200 shadow-xl rounded-xl p-8 border border-base-300">
      <h2 className="text-2xl font-bold text-center mb-6 pb-4 border-b border-base-300">Edit Profile</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* First Name */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Profile Image URL */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="profileImg">Profile Image URL</label>
          <input
            type="text"
            id="profileImg"
            name="profileImg"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.profileImg}
            onChange={handleChange}
            placeholder="e.g., https://example.com/your-image.jpg"
          />
          {errors.profileImg && <p className="text-error text-sm mt-1">{errors.profileImg}</p>}
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.age}
            onChange={handleChange}
            min="1"
            max="120"
          />
          {errors.age && <p className="text-error text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Gender Select */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="select select-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">♂ Male</option>
            <option value="female">♀ Female</option>
            <option value="other">⚧ Other</option>
          </select>
          {errors.gender && <p className="text-error text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* About */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            rows="3"
            className="textarea textarea-bordered w-full resize-y focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.about}
            onChange={handleChange}
            placeholder="Tell us a little about yourself..."
          ></textarea>
          {errors.about && <p className="text-error text-sm mt-1">{errors.about}</p>}
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="skills">Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.skills.join(', ')} // Display as comma-separated string
            onChange={handleSkillsChange}
            placeholder="e.g., React, Node.js, MongoDB, UI/UX"
          />
          {/* You can add validation for skills if needed */}
        </div>

        {errors.api && <p className="text-error text-sm mt-4 text-center">{errors.api}</p>}

        <div className="flex gap-4 mt-6">
            <button type="button" onClick={handleCancel} className="btn btn-ghost flex-grow">
                Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-grow" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;