import { useContext, useState } from "react";
import toast from "react-hot-toast";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const { login } = useContext(AuthContext);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value.trim());

  const showValidationError = (message) => {
    setValidationError(message);
    toast.error(message);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setValidationError("");
    toast.dismiss();

    if (currState === "Sign Up" && !isDataSubmitted) {
      const trimmedName = fullName.trim();

      if (!trimmedName || trimmedName.length < 2) {
        showValidationError("Full name must be at least 2 characters long.");
        return;
      }

      setIsDataSubmitted(true);
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedBio = bio.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      showValidationError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      showValidationError("Password must be at least 6 characters long.");
      return;
    }

    if (currState === "Sign Up") {
      if (!trimmedBio || trimmedBio.length < 5) {
        showValidationError("Bio must be at least 5 characters long.");
        return;
      }

      if (!agreeTerms) {
        showValidationError("You must agree to the terms of use and privacy policy.");
        return;
      }
    }

    login(currState === "Sign Up" ? 'signup' : 'login', {
      fullName: fullName.trim(),
      email: trimmedEmail,
      password,
      bio: trimmedBio,
    });
  };

  return (
    <div className="flex min-h-full items-center justify-center overflow-y-auto backdrop-blur-2xl">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 p-4 sm:p-8 md:flex-row md:gap-20">
        
        {/* Left */}
        <div className="flex w-full justify-center md:w-1/2">
          <h1 className="text-amber-600 text-3xl">Chit</h1>
          <img
            src={assets.logo_icon}
            
            alt=""
            className="w-16 max-w-full sm:w-24 md:w-32 lg:w-36"
          />
          <h1 className="text-amber-600 text-3xl">Chat</h1>
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
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (validationError) {
                    setValidationError("");
                    toast.dismiss();
                  }
                }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationError) {
                      setValidationError("");
                      toast.dismiss();
                    }
                  }}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="p-2 border border-gray-500 rounded-md focus:outline-none"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationError) {
                      setValidationError("");
                      toast.dismiss();
                    }
                  }}
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
                onChange={(e) => {
                  setBio(e.target.value);
                  if (validationError) {
                    setValidationError("");
                    toast.dismiss();
                  }
                }}
                value={bio}
                placeholder="Provide short bio... "
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none"
              />
            )}

            {validationError && (
              <p className="text-sm text-red-400">{validationError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#ec0f0f] px-4 py-2 text-sm font-medium"
            >
              {currState === "Sign Up" ? "Create Account" : "Login Now"}
            </button>

            {currState === "Sign Up" && isDataSubmitted && (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (validationError) {
                      setValidationError("");
                      toast.dismiss();
                    }
                  }}
                />
                <p className="text-xs">
                  Agree to the terms of use and privacy policy.
                </p>
              </div>
            )}

            <div>
              {currState === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setCurrState("Login");
                      setIsDataSubmitted(false);
                      setValidationError("");
                      toast.dismiss();
                      setAgreeTerms(false);
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
                    onClick={() => {
                      setCurrState("Sign Up");
                      setValidationError("");
                      toast.dismiss();
                      setAgreeTerms(false);
                    }}
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
