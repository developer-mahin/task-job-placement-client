import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AuthContext } from "../context/AuthProvider";
import { BsMoonStarsFill, BsSun } from 'react-icons/Bs';
import { ThemeContext } from "../pages/_app";


const Navbar = () => {

    const [open, setOpen] = useState(false)
    const { user, signOutMethod } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)


    const signOutHandler = () => {
        signOutMethod()
            .then(() => {
                toast.success("successfully sign out ")
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }

    return (
        <div className='container mx-auto' id={theme}>
            <nav className='md:container mx-auto flex justify-between items-center relative bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900'>
                <Link href='/' className='flex items-center gap-1'>
                    <img src="https://cdn-icons-png.flaticon.com/512/906/906334.png" className="w-10" alt="" />
                    <span className="text-xl font-semibold">UniQue</span>
                </Link>
                <ul className={`md:bg-transparent md:flex md:justify-end md:static absolute w-full text-center z-10 flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white" ${open ? 'top-10 ' : 'top-[-300px]'}`}>
                    <li>
                        <Link
                            onClick={() => setOpen(!open)}
                            href="/" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium border-0 border-b-2 border-gray-300" : "text-center"}`} aria-current="page"
                        >Home</Link>
                    </li>

                    <li>
                        <Link
                            onClick={() => setOpen(!open)}
                            href="/add_tasks" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium border-0 border-b-2 border-gray-300" : "text-center"}`} aria-current="page"
                        >Add Tasks</Link>
                    </li>

                    <li>
                        <Link
                            onClick={() => setOpen(!open)}
                            href="/my_tasks" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium border-0 border-b-2 border-gray-300" : "text-center"}`} aria-current="page"
                        >My Tasks</Link>
                    </li>


                    <li>
                        <Link
                            onClick={() => setOpen(!open)}
                            href="/completed_tasks" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium border-0 border-b-2 border-gray-300" : "text-center"}`} aria-current="page"
                        >Completed Tasks</Link>
                    </li>


                    {
                        user?.uid ? <>
                            <li>
                                <button
                                    onClick={signOutHandler}
                                    className="bg-cyan-400 px-6 py-2 border-2 border-cyan-400 rounded-full hover:bg-transparent hover:text-cyan-600 hover:font-medium"
                                >Sign out</button>
                            </li>
                        </> : <>

                            <li>
                                <Link
                                    onClick={() => setOpen(!open)}
                                    href="/sign_in" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium border-0 border-b-2 border-gray-300" : "text-center"}`} aria-current="page"
                                >Sign In</Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setOpen(!open)}
                                    href="/sign_up" className={`block py-2 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" ${open ? "text-left font-medium" : "text-center"}`} aria-current="page"
                                >Sign Up</Link>
                            </li>

                        </>
                    }
                    <li>
                        <img
                            onClick={() => setOpen(!open)}
                            className="w-10 h-10 cursor-pointer rounded-full"
                            src={user?.uid ? `${user?.photoURL}` : "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                            }
                            title={user?.displayName}
                            alt=""
                        />
                    </li>
                    <li>
                        <div>
                            {
                                theme === "light" ? <BsMoonStarsFill
                                    onClick={() => toggleTheme(localStorage.getItem("theme"))}
                                    className="text-2xl mt-[7px] cursor-pointer"></BsMoonStarsFill> :
                                    <BsSun
                                        onClick={() => toggleTheme(localStorage.getItem("theme"))}
                                        className="text-2xl mt-[7px] cursor-pointer">
                                    </BsSun>

                            }
                        </div>
                    </li>

                </ul>
                <div className='md:hidden md:pr-0 pr-3'>
                    {
                        open ?
                            <HiX onClick={() => setOpen(!open)} className="h-9 w-9 text-black cursor-pointer" /> :
                            <HiMenuAlt3 onClick={() => setOpen(!open)} className="h-9 w-9 text-black cursor-pointer" />
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;