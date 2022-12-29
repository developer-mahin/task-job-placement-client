import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import SmallSpinner from './SmallSpinner';

const SingleTask = ({ task, refetch }) => {
    const { image, title, description, _id, task_status } = task;
    const [loading, setLoading] = useState(false)
    const [updateTask, setUpdateTask] = useState("")

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const completeHandler = (id) => {
        setLoading(true)
        fetch(`https://task-projects-server.vercel.app/completed_task/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Task complete successfully")
                    setLoading(false)
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }


    const handleDelete = (id) => {
        setLoading(true)
        fetch(`https://task-projects-server.vercel.app/delete_task/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("successfully delete")
                setLoading(false)
                refetch()
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    const updateHandler = (id) => {
        setLoading(true)
        fetch(`https://task-projects-server.vercel.app/update_task/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ description: updateTask })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("successfully updated task")
                    setLoading(false)
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    return (
        <div className='grid lg:grid-cols-4 grid-cols-1 gap-6 items-center py-4 shadow-xl p-6 rounded-lg my-4 border hover:shadow-2xl'>
            <div>
                <img className='w-full h-1/2 ' src={image} alt="" />
            </div>
            <div className='col-span-3'>
                <h2 className='text-4xl font-bold py-2'>{title}</h2>
                <p>{description}</p>
                <small className='capitalize text-green-400 font-semibold py-2 text-xl'>Task {task_status}</small>
                <div className='flex items-center gap-3 mt-3'>

                    <button
                        type="button"
                        onClick={openModal}
                        className="px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400 capitalize"
                    >
                        Update
                    </button>

                    <button
                        onClick={() => handleDelete(_id)}
                        className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-red-600 rounded text-red-600'
                    >
                        {
                            loading ? <SmallSpinner></SmallSpinner> : "Delete"
                        }

                    </button>
                    <button
                        onClick={() => completeHandler(_id)}
                        disabled={task_status === "completed"}
                        className={`${task_status === "completed" ? "text-green-300 border-green-200 border-2 rounded px-4 py-1.5" : "px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400 capitalize"} `}
                    >
                        {
                            loading ? <SmallSpinner></SmallSpinner> : "Complete"
                        }

                    </button>
                </div>
            </div>
            <Modal
                _id={_id}
                updateHandler={updateHandler}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                closeModal={closeModal}
                openModal={openModal}
                setUpdateTask={setUpdateTask}
                loading={loading}
            ></Modal>
        </div>
    );
};

export default SingleTask;