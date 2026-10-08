import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// POST {VITE_API_BASE_URL}/api/contact — body matches the backend ContactRequest model.
export async function submitContactForm({ name, email, phone, subject, message }) {
  const response = await apiClient.post('/api/contact', { name, email, phone, subject, message })
  return response.data
}
