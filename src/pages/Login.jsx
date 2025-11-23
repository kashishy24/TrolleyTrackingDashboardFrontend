import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import loginBackground from "../assets/images/loginBackground.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [usernames, setUsernames] = useState([]);

  const { username, password } = formData;

  // Fetch usernames on page load
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await axios.get("http://192.168.1.35:3002/api/login/username");
        console.log("Usernames Response:", res.data);

        if (Array.isArray(res.data)) {
          setUsernames(res.data);
        } else {
          alert("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
        alert("Failed to load username list");
      }
    };

    fetchUsernames();
  }, []);

  // Handle input change
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Login submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.35:3002/api/login/Userlogin",
        { username, password }
      );

      console.log("Login API Response:", res.data);

      // Adjusted based on typical backend response
      if (res.data.success === true || res.data.Status === 1) {
        const token = res.data.token || res.data.Token;
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        alert(res.data.message || "Invalid login details");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  // Auto redirect if logged in already
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#00AEEF] to-[#7B2FF7] px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden h-full md:h-[90vh]">

        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img src={loginBackground} alt="background" className="w-2/3 h-auto" />
        </div>

        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <div>
            <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>
            <form className="space-y-2" onSubmit={handleOnSubmit}>
              
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
  );
};

export default Login;
