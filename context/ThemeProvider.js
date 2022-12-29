// import { createContext, useState } from "react";


// export const ThemeContext = createContext(null)

// const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState("light")

//     const toggleTheme = () => {
//         setTheme((current) => (current === "light" ? "dark" : "light"))
//     }

//     const themeInfo = {
//         theme,
//         toggleTheme
//     }

//     return (
//         <ThemeContext.Provider value={themeInfo}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export default ThemeProvider;