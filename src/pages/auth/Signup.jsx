import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  // const [sucess, setSucess] = useState("");

  // const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      repeatPassword,
    }

    try {
      await signupService(user);
      navigate("/login")
    } catch (error) {
      const { errorMessage } = error.response.data;
      setError(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 loginMenuImg">
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="flex flex-row justify-center text-4xl font-bold text-center text-gray-700 dark:text-white"><img src="logo.png" alt="" width={200} /></h2>
              <p className="mt-3 text-gray-500 dark:text-gray-300">Create new account</p>
              {error !== "" &&
                <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-5">
                  <div class="flex items-center justify-center w-12 bg-red-500">
                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                    </svg>
                  </div>

                  <div class="px-4 py-2 -mx-3">
                    <div class="mx-3 text-left">
                      <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
                      <p class="text-sm text-gray-600 dark:text-gray-200">{error}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="mt-8">
              <form onSubmit={handleSignup}>
                <div className="mt-6">

                  <div className="flex flex-col justify-between items-start mb-2">
                    <label for="username" className="text-left block text-sm text-gray-600 dark:text-gray-200">Username</label>
                    <input type="text" value={username} onChange={handleUsernameChange} name="username" id="username" placeholder="Enter username" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                </div>
                <div className="mt-6">

                  <div className="flex flex-col justify-between items-start mb-2">
                    <label for="email" className="text-left block text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" value={email} onChange={handleEmailChange} name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <label for="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                  </div>
                  <input type="password" name="password" value={password} onChange={handlePasswordChange} id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <label for="password" className="text-sm text-gray-600 dark:text-gray-200">Repeat password</label>
                  </div>
                  <input type="password" name="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} id="password" placeholder="Repeat Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Register
                  </button>
                </div>

              </form>

              <p className="mt-6 text-sm text-center text-gray-400">Have an account? <a href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Log In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
