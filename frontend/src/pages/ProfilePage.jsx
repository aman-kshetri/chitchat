import { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-full items-center justify-center overflow-y-auto px-4 py-8 backdrop-blur-2xl sm:px-8">
      <div className="w-full max-w-lg rounded-2xl border border-amber-50 p-5 backdrop-blur-lg sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/60">Your account</p>
            <h1 className="text-2xl font-medium">Profile details</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            aria-label="Go back"
          >
            <img src={assets.logo_icon} alt="" className="w-5" />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <label
            htmlFor="Avatar"
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/40 p-4 transition hover:border-white"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              name="Avatar"
              id="Avatar"
              accept=".png, .jpg, .jpeg"
              className="hidden"
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
            <span className="flex flex-col">
              <span className="font-medium">
                {selectedImage
                  ? "Change profile image"
                  : "Upload profile image"}
              </span>
              <span className="text-xs text-white/60">
                PNG or JPG, up to 5MB
              </span>
            </span>
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Full name
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none transition focus:border-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Bio
            <textarea
              rows={4}
              required
              placeholder="Provide short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="resize-none rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none transition focus:border-white"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-[#ec0f0f] px-4 py-3 text-sm font-medium transition hover:bg-[#d90d0d]"
          > Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
