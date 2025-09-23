import { useState, useEffect } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import loginBackground from "../assets/images/loginBackground.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUsername } from "../services/operations/authAPI"
import { login } from "../services/operations/authAPI"

const Login = ({ switchView }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [usernames, setUsernames] = useState([]) // store usernames here

  const { username, password } = formData

  // Fetch usernames on page load
  useEffect(() => {
  const getUsernames = async () => {
    try {
      const response = await fetchUsername()()
      if (Array.isArray(response?.data)) {
        setUsernames(response.data)  // response is your array of { Username: "..." }
      }
    } catch (err) {
      console.error("Failed to fetch usernames:", err)
    }
  }
  getUsernames()
}, [])


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // console.log("Logging in with:", username, password)
    dispatch(login(username, password, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#00AEEF] to-[#7B2FF7] px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden h-full md:h-[90vh]">
        
        {/* Left Side - Logo */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img src={loginBackground} alt="background" className="w-2/3 h-auto" />
        </div>
    
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <div>
            <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>
            <form className="space-y-2" onSubmit={handleOnSubmit}>
              
              {/* Username Dropdown */}
              <select
                required
                name="username"
                value={username}
                onChange={handleOnChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Username</option>
                {usernames.map((userObj, idx) => (
                  <option key={idx} value={userObj.Username}>
                    {userObj.Username}
                  </option>
                ))}
              </select>

        
              {/* Password Input with Eye Icon */}
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full p-2 border rounded pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={20} fill="#AFB2BF" />
                  )}
                </span>
              </div>
        
              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-4xl cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
