import { Switch } from "@headlessui/react";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const ToggleButton = () => {
    const [enabled, setEnabled] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext)
    console.log(theme)
    return (
        <div className="mt-[6px]">
            <Switch
                checked={enabled}
                onChange={()=>{setEnabled(); toggleTheme()}}
                className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    );
};

export default ToggleButton;