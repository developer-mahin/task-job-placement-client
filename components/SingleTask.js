import Link from 'next/link';
import React from 'react';

const SingleTask = ({ task }) => {
    const { image, title, description, _id } = task;

    return (
        <Link href={`/task_details/${_id}`} className='grid lg:grid-cols-4 grid-cols-1 gap-6 items-center py-4 shadow-xl p-6 rounded-lg my-4 border hover:shadow-2xl'>
            <div>
                <img className='w-full h-1/2 ' src={image} alt="" />
            </div>
            <div className='col-span-3'>
                <h2 className='text-4xl font-bold'>{title}</h2>
                <p>{description && description.slice(0, 250) + "..."}</p>
                <div className='flex items-center gap-3 mt-3'>
                    <button 
                    className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400'>Update</button>
                    <button 
                    className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-red-600 rounded text-red-600'>Delete</button>
                    <button 
                    className='px-4 py-1.5 font-medium border-2 hover:-translate-y-2 transition-all border-green-400 rounded text-green-400'>Complete</button>
                </div>
            </div>

        </Link>
    );
};

export default SingleTask;