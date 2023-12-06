import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../images/logo/logo-icon.png';
import ball from '../../images/logo/backgroud_ball.png';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { authorization } from '../../../../infra/store/authorizationStore';
import * as Yup from 'yup';
import { AccountIdentity } from '../../../../domain/models/accountIdentity';
import { PostAction } from '../../../../infra/store/storeRepository';
import { jwtDecode } from 'jwt-decode';
import { currentUser } from "../../../../infra/store/userAccountStore";
import { Credentials } from '../../../../domain/models/credentials';
import { IdentityUser } from '../../../../domain/models/identityUser';

const SignIn = () => {

    const command = authorization.command.action;
    const dispatch = authorization.dispatch;
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

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
                currentUser.Identity = {
                    Id: 0, Label: "",
                    Info: {
                        Id: 0,
                        Label: "",
                        UserName: decoded.name,
                        Email: decoded.email
                    }
                }                        
            }      
            if(currentUser.IsAuthorized)
            {
                useNavigate()("/profile");        
            }      
        });
    }
        
    function onSubmit({ email, password }: any) {
        return dispatch(
            command({          
                data: 
                { Credentials: {
                            Email: email,
                            Password: password }
                } as AccountIdentity,
                method: "SignIn",
                postaction: resultHandler
        }));
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
                                <Link to="/profile" className="text-primary">
                               Contact us</Link>
                                </label>
                            </div>
                            <img  className="flex" src={logo} alt="logo" />
                        </div>
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                           
                            <span className="mb-1.5 block font-medium"></span>                       
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Sign in
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input                                            
                                            type="password"
                                            {...register("password")}
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="invalid-feedback">{errors.password?.message}</div>
                                        <span className="absolute right-4 top-4">
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-5 mb-5.5 flex items-center justify-between">
                                    <label htmlFor="formCheckbox" className="flex cursor-pointer">
                                        <div className="relative pt-0.5">
                                            <input
                                                type="checkbox"
                                                id="formCheckbox"
                                                className="taskCheckbox sr-only"
                                            />
                                            <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                                                <span className="text-white opacity-0">
                                                </span>
                                            </div>
                                        </div>
                                        <p>Remember me</p>
                                    </label>
                                    <Link to="/auth/resetpw" className="text-sm text-primary">
                                        Forget password?
                                    </Link>
                                </div>
                                <div className="mb-5">
                                    <input disabled={isSubmitting}
                                       
                                        type="submit"
                                        value="Sign in"
                                        className="w-full cursor-pointer border border-black bg-black p-4 text-white transition hover:bg-opacity-90"
                                    />
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </div>
                                <div className="mt-6 text-center">
                                    <p>
                                        Don’t have any account?{' '}
                                        <Link to="/auth/signup" className="text-primary">
                                            Sign up
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

export default SignIn;
