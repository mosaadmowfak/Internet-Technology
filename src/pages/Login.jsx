import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // ❗ لازم الإيميل يكون متفعل
      if (!userCred.user.emailVerified) {
        alert("فعل الإيميل الأول ❗");
        return;
      }

      const uid = userCred.user.uid;

      // 🔥 نجيب بيانات اليوزر من Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("User data not found ❌");
        return;
      }

      const userData = docSnap.data();

      // 🔥 check admin
      if (role === "admin") {
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          alert("مش Admin ❌");
        }
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-[#1D2B59] mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Sign in to continue
        </p>

        {/* Role toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              role === "student"
                ? "bg-white text-[#1D2B59] shadow"
                : "text-gray-500"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              role === "admin"
                ? "bg-[#1D2B59] text-white shadow"
                : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="name@must.edu.eg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-white ${
              role === "admin"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-[#1D2B59] hover:bg-blue-900"
            }`}
          >
            {role === "admin" ? "Login as Admin" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#1D2B59] font-bold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;