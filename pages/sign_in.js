import Lottie from "lottie-react";
import Link from "next/link";
import { FaGoogle } from 'react-icons/fa';
import signInLottie from "../assets/72874-user-profile-v2.json";



const Sign_in = () => {
    return (
        <div className="lg:w-[1000px] w-full mx-auto grid lg:grid-cols-2 grid-cols-1 items-center gap-6 px-3">
            <div>
                <Lottie className="w-full" animationData={signInLottie} loop={true} />
            </div>
            <div>
                <form>
                    <h2 className="text-center text-2xl pb-9 font-semibold">Sign In</h2>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@gmail.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                    </div>
                    <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign In</button>
                </form>
                <div>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid h-20 rounded-box place-items-center">
                            <p>
                                New to here?{" "}
                                <Link
                                    className="text-secondary font-semibold hover:underline"
                                    href="/sign_up"
                                >
                                    Create new account
                                </Link>{" "}
                            </p>
                        </div>
                        <button className="flex justify-center items-center gap-2 bg-cyan-500 border-cyan-500 border-2 hover:bg-white hover:text-cyan-500 py-2 rounded-full text-white">
                            <FaGoogle className=""></FaGoogle>
                            <span className="font-medium">Sign up with Google</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sign_in;