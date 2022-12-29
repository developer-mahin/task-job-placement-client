import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useState } from "react";
import BigSpinner from "../components/BigSpinner";
import SingleTask from "../components/SingleTask";
import { AuthContext } from "../context/AuthProvider";

const My_tasks = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const { data: allMyTasks = [], refetch } = useQuery({
        queryKey: ["allMyTasks", user?.email],
        queryFn: async () => {
            setLoading(true)
            const res = await fetch(`https://task-projects-server.vercel.app/my_tasks?email=${user?.email}`)
            const data = await res.json()
            setLoading(false)
            return data
        }

    })

    return (
        <>

            {
                loading ? <BigSpinner></BigSpinner> : <>

                    {
                        !allMyTasks.length ? <>
                            <h2 className="text-center text-3xl font-medium lg:py-56 py-6">
                                You do not add any task
                                <Link
                                    href="/add_tasks"
                                    className="text-blue-500 hover:underline ml-2">
                                    please add tasks
                                </Link>
                            </h2>
                        </> : <>

                            <div className="lg:w-[900px] w-full mx-auto px-3">
                                {
                                    allMyTasks.map(task => <SingleTask

                                        key={task._id}
                                        task={task}
                                        refetch={refetch}
                                    ></SingleTask>)
                                }
                            </div>

                        </>
                    }

                </>
            }

        </>
    );
};

export default My_tasks;