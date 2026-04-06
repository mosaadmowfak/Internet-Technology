import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@must.edu.eg")) {
      alert("لازم تستخدم ايميل الجامعة");
      return;
    }

    try {
      // 🔥 create auth user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // 🔥 save in firestore (IMPORTANT)
      await setDoc(doc(db, "users", user.uid), {
        name: name || user.email.split("@")[0],
        email: user.email,
        role: role,
        projects: []
      });

      // 🔥 send verification
      await sendEmailVerification(user);

      alert("Account created 🔥 Check your email");

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-[#1D2B59] mb-6 text-center">
          Join the Community
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* 🔥 name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 🔥 role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            >
              <option value="student">Student</option>
              <option value="developer">Developer / Designer</option>
            </select>
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button className="w-full bg-[#1D2B59] text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition mt-2">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1D2B59] font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;