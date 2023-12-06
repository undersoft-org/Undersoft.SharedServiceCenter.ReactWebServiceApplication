import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo-icon.png';
import ball from '../../images/logo/backgroud_ball.png';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { authorization } from '../../../../infra/store/authorizationStore';
import * as Yup from 'yup';
import { Credentials } from '../../../../domain/models/credentials';
import { PostAction } from '../../../../infra/store/storeRepository';

const ResetPassword = () => {
    const command = authorization.command.action;
    const dispatch = authorization.dispatch;

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const signingHandler: PostAction<Credentials, string, any> = (response) => { response.then(r => r.data) }

    function onSubmit({ email, password }: any) {
        return dispatch(
            command({
                method: "SetPassword",
                data: {
                    Email: email
                } as Credentials,
                postaction: signingHandler
            }));
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">                                      
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/3 xl:border-l-2">     
                        <div className="pl-6 pb-10">
                            <div className="place-content-end ">
                            <label className="mb-2.5 block font-small text-black dark:text-white">
                                If you need assistance. 
                                <Link to="/profile" className="text-primary">
                               Contact us</Link>
                                </label>
                            </div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                           
                            <span className="mb-1.5 block font-medium"></span>                       
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Password reset
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email, where to send the instructions                                          
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter email for the account"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>                               
                                
                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Confirm password reset"
                                        className="w-full cursor-pointer border border-black bg-black p-4 text-white transition hover:bg-opacity-90"
                                    />
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
                        <img src={ball} />
                            </span></div></div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
