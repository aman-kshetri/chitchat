import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign Up" ? 'signup' : 'login', { fullName, email, password, bio });
  };

  return (
    <div className="flex min-h-full items-center justify-center overflow-y-auto backdrop-blur-2xl">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 p-4 sm:p-8 md:flex-row md:gap-20">
        
        {/* Left */}
        <div className="flex w-full justify-center md:w-1/2">
          <img
            src={assets.logo_icon}
            alt=""
            className="w-20 max-w-full sm:w-32 md:w-auto md:max-w-2xl"
          />
        </div>

        {/* Right */}
        <div className="w-full rounded-2xl border border-amber-50 p-4 backdrop-blur-lg sm:p-6 md:w-1/2">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col gap-4 w-full"
          >
            <h2 className="text-2xl font-medium text-center">
              {currState}
              {isDataSubmitted && (
                <img
                  onClick={() => setIsDataSubmitted(false)}
                  src={assets.arrow_icon}
                  alt=""
                  className="inline-block w-5 cursor-pointer"
                />
              )}
            </h2>

            {currState === "Sign Up" && !isDataSubmitted && (
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                className="p-2 border border-gray-500 rounded-md focus:outline-none"
                placeholder="Full Name"
                required
              />
            )}

            {!isDataSubmitted && (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="p-2 border border-gray-500 rounded-md focus:outline-none"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  className="p-2 border border-gray-500 rounded-md focus:outline-none"
                />
              </>
            )}

            {currState === "Sign Up" && isDataSubmitted && (
              <textarea
                rows={4}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Provide short bio... "
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none"
              />
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#ec0f0f] px-4 py-2 text-sm font-medium"
            >
              {currState === "Sign Up" ? "Create Account" : "Login Now"}
            </button>

            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" />
              <p className="text-xs">
                Agree to the terms of use and privacy policy.
              </p>
            </div>

            <div>
              {currState === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setCurrState("Login");
                      setIsDataSubmitted(false);
                    }}
                    className="text-[#ec0f0f] cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p>
                  Create an account{" "}
                  <span
                    onClick={() => setCurrState("Sign Up")}
                    className="text-[#ec0f0f] cursor-pointer"
                  >
                    Click here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
