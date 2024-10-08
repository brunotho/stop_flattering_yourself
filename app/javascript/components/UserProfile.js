import React, { useState } from 'react';

export default function UserProfile({ initialUser = {}, languages = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [changingSensitiveInfo, setChangingSensitiveInfo] = useState(false);

  console.log("user id:", user.id);

  const handleSensitiveInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "password" || name === "password_confirmation") {
      if (value) {
        setChangingSensitiveInfo(true);
      } else {
        setChangingSensitiveInfo(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Convert FormData to an object and exclude empty password fields
    const formObject = {};
    formData.forEach((value, key) => {
      if ((key === "password" || key === "password_confirmation") && !value) {
        // Do not include empty password fields
        return;
      }
      formObject[key] = value;
    });

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          user: formObject,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        setErrors({});
        setChangingSensitiveInfo(false);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
            />
            {errors.name && <span className="error">{errors.name.join(", ")}</span>}
          </div>

          {/* Language Field */}
          <div>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              defaultValue={user.language}
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {errors.language && (
              <span className="error">{errors.language.join(", ")}</span>
            )}
          </div>

          {/* Password Fields */}
          <div>
            <label htmlFor="password">New Password (optional)</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleSensitiveInfoChange}
            />
            {errors.password && (
              <span className="error">{errors.password.join(", ")}</span>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation">Confirm New Password</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={handleSensitiveInfoChange}
            />
          </div>

          {/* Current Password Field */}
          {changingSensitiveInfo && (
            <div>
              <label htmlFor="current_password">Current Password</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                required
              />
              {errors.current_password && (
                <span className="error">
                  {errors.current_password.join(", ")}
                </span>
              )}
            </div>
          )}

          {/* Form Buttons */}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>Language: {user.language}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
