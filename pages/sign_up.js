import Lottie from "lottie-react";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import signUpLottie from "../assets/38435-register.json";
import { AuthContext } from "../context/AuthProvider";

const Sign_up = () => {

    const { createAccount,updateUserProfile, googleSignIn } = useContext(AuthContext)

    const googleHandler = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user
                toast.success("Successfully sign in with google")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    const handleSignUp = (event) => {
        event.preventDefault()
        const form = event.target;
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const image = form.file
        const email = form.email.value;
        const password = form.password.value;

       console.log(image);
        
        const formData = new FormData()
        formData.append("image", image)

        // console.log(formData)

        // createAccount(email, password)
        //     .then((result) => {
        //         const user = result.user
        //         // updateUserProfile()
        //         toast.success("Account created successfully")
        //         form.reset()
        //     })
        //     .catch(err => {
        //         toast.error(err.message)
        //     })
    }

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-center lg:w-[1000px] w-full mx-auto px-3">
            <Lottie animationData={signUpLottie}></Lottie>

            <div>
                <form onSubmit={handleSignUp}>
                    <h2 className="text-center text-2xl pb-9 font-semibold">Create An Account</h2>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-transparent peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="first_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                First name
                            </label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="last_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Last name
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="file"
                            name="image"
                            className="block w-full text-sm text-gray-900 bg-transparent appearance-none peer border-0 border-b-2 border-gray-300"
                            placeholder=" "
                            required
                        />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>
                    <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign Up</button>
                </form>
                <div>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid h-20 rounded-box place-items-center">
                            <p>
                                Already have an account.{" "}
                                <Link
                                    className="text-secondary font-semibold hover:underline"
                                    href="/sign_in"
                                >
                                    Sign In
                                </Link>{" "}
                            </p>
                        </div>
                        <button
                            onClick={googleHandler}
                            className="flex justify-center items-center gap-2 bg-cyan-500 border-cyan-500 border-2 hover:bg-white hover:text-cyan-500 py-2 rounded-full text-white">
                            <FaGoogle className=""></FaGoogle>
                            <span className="font-medium">Sign up with Google</span>

                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Sign_up;