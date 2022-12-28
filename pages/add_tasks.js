import { useState } from "react";
import { toast } from "react-hot-toast";
import SmallSpinner from "../components/SmallSpinner";

const Add_tasks = () => {
    const [loading, setLoading] = useState(false)

    const addTaskHandler = (event) => {
        setLoading(true)
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const image = form.image.files[0];
        const description = form.description.value;

        const formData = new FormData()
        formData.append("image", image)
        const uri = `https://api.imgbb.com/1/upload?key=77f09a682af2d728593ff4efd38c7386`

        fetch(uri, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const tasksInfo = {
                    title,
                    description,
                    image: data.data.display_url
                }
                fetch("http://localhost:5000/add_tasks", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(tasksInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        toast.success("task successfully added")
                        setLoading(false)
                    })
                    .catch(err => {
                        toast.error(err.message)
                        setLoading(false)
                    })
            })
    }


    return (
        <div className="lg:w-[700px] w-full mx-auto px-3">
            <form onSubmit={addTaskHandler}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Title
                    </label>
                    <input
                        type="title"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Add your task title"
                        required
                    />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Add image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 bg-transparent appearance-none peer rounded-lg border-2 border-gray-300"
                        placeholder=" "
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Description
                    </label>
                    <textarea
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Add your task description"
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-500 rounded-full py-1.5 hover:bg-transparent border-2 border-cyan-500 font-medium hover:text-cyan-500 text-white transition-all"
                >
                    {
                        loading ? <SmallSpinner></SmallSpinner> : "Add Task"
                    }
                </button>
            </form>
        </div>
    );
};

export default Add_tasks;