import Lottie from "lottie-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from 'react-icons/fa';
import signInLottie from "../assets/72874-user-profile-v2.json";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../context/AuthProvider";



const Sign_in = () => {
    const { signInWithEmailPassword, googleSignIn } = useContext(AuthContext)
    const [disable, setDisable] = useState(true)
    const [loading, setLoading] = useState(false)

    const googleHandler = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user
                saveUserInDB(
                    user?.displayName,
                    user?.email,
                    user?.photoURL
                )
                toast.success("Successfully sign in with google")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    const handleSignIn = (event) => {
        setLoading(true)
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailPassword(email, password)
            .then(result => {
                const user = result.user;
                toast.success("User successfully log in")
                verifyJWT(email)
                form.reset()
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }


    const saveUserInDB = (fullName, email, userImage) => {

        const userData = {
            fullName,
            email,
            userImage,
            verify: false
        }

        fetch("https://task-projects-server.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                verifyJWT(email)
            })
    }

    const verifyJWT = (email) => {
        fetch(`https://task-projects-server.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("access-token", data.access_token)
            })

    }

    return (
        <div className="lg:w-[1000px] w-full mx-auto grid lg:grid-cols-2 grid-cols-1 items-center gap-6 px-3">
            <div>
                <Lottie className="w-full" animationData={signInLottie} loop={true} />
            </div>
            <div>
                <form onSubmit={handleSignIn}>
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
                    <div
                        className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                onClick={() => setDisable(!disable)}
                                id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                    </div>
                    <button
                        disabled={disable}
                        type="submit"
                        className={`
                         ${disable ? "font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-cyan-200" : "text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"}
                        `}
                    >
                        {
                            loading ? <SmallSpinner></SmallSpinner> : "Sign In"
                        }

                    </button>
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
                        <button
                            onClick={googleHandler}
                            className="flex justify-center items-center gap-2 bg-cyan-500 border-cyan-500 border-2 hover:bg-white hover:text-cyan-500 py-2 rounded-full text-white"
                        >
                            <FaGoogle></FaGoogle>
                            <span className="font-medium">Sign up with Google</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Sign_in;