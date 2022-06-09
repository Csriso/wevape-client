import { useState, useContext } from "react";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context.js"
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { authenticateUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken)
      await authenticateUser();
      navigate("/");

    } catch (error) {
      const { errorMessage } = error.response.data;
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="bg-gray-900 w-full">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3 loginMenuImg">  {/*style={background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)} */}
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="flex flex-row justify-center text-4xl font-bold text-center text-gray-700 text-white"><img src="logo.png" alt="" width={200} /></h2>
                <p className="mt-3 text-gray-500 text-gray-300">Sign in to access your account</p>
                {error !== "" &&
                  <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md bg-gray-800 mt-5">
                    <div className="flex items-center justify-center w-12 bg-red-500">
                      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                      </svg>
                    </div>

                    <div className="px-4 py-2 -mx-3">
                      <div className="mx-3 text-left">
                        <span className="font-semibold text-red-500 text-red-400">Error</span>
                        <p className="text-sm bg-gray-900 text-gray-200">{error}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="mt-8">
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col justify-between items-start mb-2">
                    <label htmlFor="email" className="text-left block text-sm text-gray-200">Email Address</label>
                    <input type="email" value={email} onChange={handleEmailChange} name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <label htmlFor="password" className="text-sm text-gray-200">Password</label>
                      {/* <a href="#" className="m-0 text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> */}
                    </div>

                    <input type="password" name="password" value={password} onChange={handlePasswordChange} id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

