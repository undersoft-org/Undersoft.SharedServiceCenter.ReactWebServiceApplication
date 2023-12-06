import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo/logo-icon.png';
import ball from '../../images/logo/backgroud_ball.png';
import { authorization } from '../../../../infra/store/authorizationStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Credential } from '../../../../domain/models/credential';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { AccountIdentity } from '../../../../domain/models/accountIdentity';
import { Credentials } from '../../../../domain/models/credentials';
import { PostAction } from '../../../../infra/store/baseStoreRemotes';
import { currentUser } from '../../../../infra/store/userAccountStore';

const SignUp = () => {

    const command = authorization.command.action;
    const dispatch = authorization.dispatch;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        testEmail: Yup.string().email('Email is incorrect'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field)
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ name, email, password }: any) {
        return dispatch(
            command({
                data: {
                    Id: 0,
                    Label: '{Name:' + name + ',Email:' + email + '}',
                    UserName: name,
                    Email: email,
                    Password: password
                } as Credentials,
                method: "SignUp",
                postaction: resultHandler
            }));
    }

    const resultHandler: PostAction<AccountIdentity, string, any> = (response) => {
        response.then(r => {
            if (r.data == undefined) {
                toast.error("Error! wrong email or password")
            }
            else {
                let decoded = jwtDecode(r.data) as { id: number, name: string, email: string, role: string, group: string; };
                currentUser.IsAuthorized = true;
                currentUser.Id = decoded.id;
                currentUser.Group = decoded.group;
               Object.assign(currentUser, { Identity: { Credentials : { Id:0, Label:"", UserName: decoded.name, Email: decoded.email } } } );

            }      

            if(currentUser.IsAuthorized)
            {
                useNavigate()("/profile");        
            }      
        });
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/3 xl:border-l-2">
                        <div className="pl-10">
                            <div className="place-content-end ">
                                <label className="mb-2.5 block font-small text-black dark:text-white">
                                    If you need assistance.
                                    <Link to="/" className="text-primary">
                                        Contact us</Link>
                                </label>
                            </div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

                            <span className="mb-1.5 block font-medium"></span>
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Sign up
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...register("name")}
                                            placeholder="Enter your full name"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="invalid-feedback">{errors.name?.message}</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            {...register("email")}
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            {...register("password")}
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="invalid-feedback">{errors.password?.message}</div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Re-type Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            {...register("confirmPassword")}
                                            placeholder="Re-enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <input disabled={isSubmitting}
                                        type="submit"
                                        value="Proceed to account registration"
                                        className="w-full cursor-pointer border border-primary bg-black p-4 text-white transition hover:bg-opacity-90"
                                    />
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="mt-6 text-center">
                                    <p>
                                        Already have an account?{' '}
                                        <Link to="/auth/signin" className="text-primary">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="xl:w-2/3 xl:border-l-2">
                        <div className="w-full">
                            <span>
                                <img className="w-full" src={ball} />
                            </span></div></div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
