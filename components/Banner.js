const Banner = () => {
    return (
        <div className="relative">
            <div className="relative bg-opacity-75 bg-gradient-to-r from-[#7045AB] to-[#E950B4]">
                <svg
                    className="absolute inset-x-0 bottom-0 text-white"
                    viewBox="0 0 1160 163"
                >
                    <path
                        fill="currentColor"
                        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                    />
                </svg>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h1 className="text-5xl font-semibold text-white">All your tasks, teammates, and tools together</h1>
                            <h2 className="lg:text-2xl text-xl text-white font-medium lg:py-4 py-2 ">Keep everything in the same place—even if your team isn’t.</h2>
                            <input
                                className="w-10/12 rounded bg-transparent border-2 border-gray-300 text-white focus:border-gray-300" type="text"
                                placeholder="Email"
                            />
                            <button className="bg-blue-700 hover:bg-[#0747A6] text-white px-4 py-3 rounded lg:mt-4 mt-2">Sign up - it’s free!</button>
                        </div>

                        <div className="w-full flex-1 max-w-xl xl:px-8 xl:w-5/12">
                            <img src="https://i.ibb.co/YhQmf22/Trello-UICollage-4x.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;