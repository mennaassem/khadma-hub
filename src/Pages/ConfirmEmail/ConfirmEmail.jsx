import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { API_CONFIG } from "../../Config"
import { toast } from "react-toastify"

export default function ConfirmEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const userId = searchParams.get("UserId")
    const code = searchParams.get("Code")

    async function confirmEmail() {
      try {
        await axios.get(
          `${API_CONFIG.baseURL}/Auth/Confirm`,
          {
            params: {
              UserId: userId,
              Code: code
            }
          }
        )

        toast.success("Email confirmed successfully ✅")

        setTimeout(() => {
          navigate("/login")
        }, 2000)

      } catch (error) {
        toast.error("Invalid or expired confirmation link ❌")
      }
    }

    if (userId && code) {
      confirmEmail()
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-xl font-semibold">
        Confirming your email...
      </h1>
    </div>
  )
}
