import { Link } from "react-router-dom";

export default function LoginLink() {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
