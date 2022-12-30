import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import BigSpinner from "../components/BigSpinner";
import SingleCompleteTask from "../components/SingleCompleteTask";
import { AuthContext } from "../context/AuthProvider";

const Completed_tasks = () => {

    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const { data: completedTasks = [], refetch } = useQuery({
        queryKey: ["completedTasks", user?.email],
        queryFn: async () => {
            setLoading(true)
            const res = await fetch(`https://task-projects-server.vercel.app/my_completed_task?task_status="completed"&email=${user?.email}`)
            const data = await res.json()
            setLoading(false)
            return data
        }
    })

  


    return (
        <div className="container mx-auto px-3">
            {
                loading ? <BigSpinner></BigSpinner> : <>
                    {
                        !completedTasks.length ? <>
                            <h2 className="text-3xl text-center lg:py-56 py-6">You do not complete any task</h2>
                        </> : <>
                            {
                                completedTasks.map(task => <SingleCompleteTask
                                    key={task._id}
                                    task={task}
                                    refetch={refetch}
                                ></SingleCompleteTask>)
                            }
                        </>
                    }
                </>
            }
        </div>
    );
};

export default Completed_tasks;