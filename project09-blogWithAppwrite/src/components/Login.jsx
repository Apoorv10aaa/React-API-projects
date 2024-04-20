import {useDispatch} from 'react-redux';
import {Button,Input,Logo} from './index'
import authService from '../appwrite/auth';
import {login as authLogin} from '../store/authSlice'
import {useForm} from 'react-hook-form'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useRef } from 'react';

// why we use react-hook-form : beacuse it manages all the data of the from as a state completely
// register : any field on which we apply the register function, that field is then becomes a part of
// state managemnet by form .
// handleSubmit : it is function which calls the function on submit of the form passing the complete 
// state of the form as a parameter to the callback function.
function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm();
    const[error,setError]=useState(null);
    const inputRef=useRef();

    const login=async(data)=>{
        setError(null)
        try {
            const session=await authService.login(data);
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
        }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    ref={inputRef}
                    {...register("email",{
                        required:true,
                        validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    ref={inputRef}
                    {...register("password",{
                        required:true
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
      )
}
export default Login;