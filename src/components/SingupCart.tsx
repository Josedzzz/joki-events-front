export default function SignupCart() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 show-animation">
      <div className="w-full max-w-md bg-custom-dark p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-blue-400 text-center mb-4">
          Sign Up
        </h2>
        <form>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="name"
            >
              <i className="fa-regular fa-id-card"></i> Id-card
            </label>
            <input
              type="text"
              id="id-card"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your id"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="name"
            >
              <i className="fa-solid fa-user"></i> Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="address"
            >
              <i className="fa-regular fa-map"></i> Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="phone"
            >
              <i className="fa-solid fa-phone"></i> Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 text-sm border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-xs text-center mt-4">
          Already have an account? Log in
        </p>
      </div>
    </main>
  );
}
