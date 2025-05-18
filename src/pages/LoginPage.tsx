import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../stores/authSlice";
import { authService } from "../services/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../stores/store";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

const schema = yup.object().shape({
    email: yup.string().email("Invalid username/email").required("Username is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            dispatch(loginStart());
            const response = await authService.login(data.email, data.password);
            localStorage.setItem("token", response.token);
            dispatch(loginSuccess(response.token));
            toast.success("Login successful");
            navigate("/");
        } catch (error: unknown) {
            dispatch(loginFailure(error instanceof Error ? error.message : "An unknown error occurred"));
            toast.error(error instanceof Error ? error.message : "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Sign in
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Username / Email address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                                error={errors.email?.message}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                showPasswordToggle
                                {...register("password")}
                                error={errors.password?.message}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="w-full flex justify-center"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link
                        to="/register"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
