export default function UserAccount() {
  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6 flex items-center">
      <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-xl mx-auto flex flex-col">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Account Information
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="idCard"
            >
              <i className="fa-regular fa-id-card mr-2"></i> idCard
            </label>
            <input
              type="text"
              id="idCard"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your id card"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="phone"
            >
              <i className="fa-solid fa-phone mr-2"></i> Phone
            </label>
            <input
              type="text"
              id="phone"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope mr-2"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="username"
            >
              <i className="fa-regular fa-user"></i> Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="direction"
            >
              <i className="fa-solid fa-location-dot mr-2"></i> Direction
            </label>
            <input
              type="text"
              id="direction"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your direction"
            />
          </div>

          <div className="justify-between grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 border-4 border-red-400 rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete account
            </button>
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Update account information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
