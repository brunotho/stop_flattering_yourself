import React, { useState } from 'react';

export default function UserProfile({ initialUser = {}, languages = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: Object.fromEntries(formData),
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        setErrors({});
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
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

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
            {errors.language && <span className="error">{errors.language}</span>}
          </div>

          <div>
            <label htmlFor="password">New Password (optional)</label>
            <input
              type="password"
              id="password"
              name="password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div>
            <label htmlFor="password_confirmation">Confirm New Password</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
            />
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Language: {user.language}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
