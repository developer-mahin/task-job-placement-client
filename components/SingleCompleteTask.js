import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import SmallSpinner from './SmallSpinner';

const SingleCompleteTask = ({ task, refetch }) => {
    const { image, task_status, description, title, _id, comment } = task
    const [loading, setLoading] = useState(false)
    const [addComment, setAddComment] = useState("")
    const [commentLoading, setCommentLoading] = useState(false)

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

    const commentHandler = (id) => {
        setCommentLoading(true)
        fetch(`https://task-projects-server.vercel.app/comment/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ comment: addComment })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("successfully add comment")
                    setCommentLoading(false)
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err.message)
                setCommentLoading(false)
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
                {
                    comment ? <p className='py-2 text-xl capitalize'>Comment: {comment}</p> : <></>
                }
                <div className='py-4'>
                    <textarea
                        onBlur={(e) => setAddComment(e.target.value)}
                        name="" className='w-1/2 rounded-lg h-16 mb-4'></textarea>
                    <br />
                    <button
                        onClick={() => commentHandler(_id)}
                        className="px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400 capitalize"
                    >
                        {
                            commentLoading ? <SmallSpinner></SmallSpinner> : "Comment"
                        }
                    </button>
                </div>
                <div className='flex items-center gap-3 mt-3'>
                    <button
                        onClick={() => handleDelete(_id)}
                        className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-red-600 rounded text-red-600'
                    >
                        {
                            loading ? <SmallSpinner></SmallSpinner> : "Delete"
                        }

                    </button>
                    <Link
                        href="/my_tasks"
                        className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400 capitalize'
                    >
                        Not Completed

                    </Link>
                </div>
            </div>

        </div>
    );
};

export default SingleCompleteTask;