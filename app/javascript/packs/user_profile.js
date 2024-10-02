import React from 'react'
import { createRoot } from 'react-dom/client'
import UserProfile from '../components/UserProfile'

let root = null

const initializeUserProfile = () => {
  const container = document.getElementById('user-profile')

  if (container && !root) {
    try {
      const userData = JSON.parse(container.dataset.user || '{}')
      const languages = JSON.parse(container.dataset.languages || '[]')

      root = createRoot(container)
      root.render(
        <UserProfile
          initialUser={userData}
          languages={languages}
        />
      )
    } catch (error) {
      console.error("Error initializing UserProfile:", error)
    }
  }
}

document.addEventListener('turbolinks:before-render', () => {
  if (root) {
    root.unmount()
    root = null
  }
})

document.addEventListener('turbolinks:load', initializeUserProfile)
