import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; // 👁️ using lucide-react icons

const Login = () => {

  const { setShowLogin, axios, setToken, navigate } = useAppContext()

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password })

      if (data.success) {
        navigate('/')
        setToken(data.token)
        sessionStorage.setItem('token', data.token) // ✅ use sessionStorage
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>

      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-black">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your Email ID"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
            type="email"
            required
          />
        </div>

        <div className="w-full relative">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your Password"
            className="border border-gray-200 rounded w-full p-2 mt-1 pr-10 outline-black"
            type={showPassword ? "text" : "password"}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[36px] text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {state === "register" ? (
          <p>
            Already have an account? <span onClick={() => setState("login")} className="text-black cursor-pointer">Click here</span>
          </p>
        ) : (
          <p>
            Create an account? <span onClick={() => setState("register")} className="text-black cursor-pointer">Sign Up</span>
          </p>
        )}

        <button className="bg-black hover:bg-gray-900 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
