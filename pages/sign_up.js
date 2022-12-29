import Lottie from "lottie-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import signUpLottie from "../assets/38435-register.json";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../context/AuthProvider";

const Sign_up = () => {

    const { createAccount, updateUserProfile, googleSignIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)

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

    const handleSignUp = (event) => {
        setLoading(true)
        event.preventDefault()
        const form = event.target;
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const image = form.image.files[0]
        const email = form.email.value;
        const password = form.password.value;

        const formData = new FormData()
        formData.append("image", image)

        const uri = `https://api.imgbb.com/1/upload?key=77f09a682af2d728593ff4efd38c7386`


        const name = {
            first_name,
            last_name,
            fullName: function () {
                this.fullName = this.first_name + " " + this.last_name
            }
        }
        name.fullName()


        fetch(uri, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    createAccount(email, password)
                        .then((result) => {
                            const user = result.user
                            // update profile name and image 
                            updateUserProfile(name.fullName, data.data.display_url)
                            // save user info in the database
                            saveUserInDB(
                                name.fullName,
                                email,
                                data.data.display_url
                            )

                            form.reset()
                            toast.success("Account created successfully")
                            setLoading(false)
                        })
                        .catch(err => {
                            toast.error(err.message)
                            setLoading(false)
                        })
                }
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
                            accept="image/*"
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
                    <div
                        className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                onClick={() => setDisable(!disable)}
                                id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Accept terms and conditions</label>
                    </div>
                    <button
                        type="submit"
                        disabled={disable}
                        className={`
                         ${disable ? "font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-cyan-200" : "text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"}
                        `}
                    >
                        {
                            loading ? <SmallSpinner></SmallSpinner> : "Sign Up"
                        }
                    </button>
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