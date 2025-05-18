import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../stores/authSlice';
import { authService } from '../services/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../stores/store';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required')
});

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            dispatch(registerStart());
            await authService.register(data.email, data.password);
            dispatch(registerSuccess());
            toast.success('Registration successful. Please login.');
            navigate('/login');
        } catch (error: unknown) {
            dispatch(registerFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
            toast.error(error instanceof Error ? error.message : 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Create a new account</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Username / Email address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                showPasswordToggle
                                {...register('password')}
                                error={errors.password?.message}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                showPasswordToggle
                                {...register('confirmPassword')}
                                error={errors.confirmPassword?.message}
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
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;