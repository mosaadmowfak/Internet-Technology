import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-[#1D2B59] mb-6 text-center">Join the Community</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D2B59] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D2B59] outline-none">
              <option>Entrepreneur</option>
              <option>Developer / Designer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D2B59] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D2B59] outline-none" />
          </div>
          <button className="w-full bg-[#1D2B59] text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition mt-2">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-[#1D2B59] font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;