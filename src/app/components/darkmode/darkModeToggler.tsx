import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import useDarkMode from "use-dark-mode"

export function DarkModeToggler({ collapsed }: { collapsed: boolean }) {
  const darkMode = useDarkMode(false);
  const [color, setColor] = useState(darkMode.value ? "default" : "primary");

  useEffect(() => {
    setColor(darkMode.value ? "white" : "black");
  }, [darkMode.value]);
  
  return (
    <div onClick={darkMode.toggle} className={
      `flex flex-row items-center gap-4 py-2 rounded-md text-foreground-600 bg-default bg-opacity-0 hover:bg-opacity-30 transition-all cursor-pointer ` +
      `${collapsed ? 'hover:bg-opacity-0' : 'px-2'}`
    }>
      <button className={`flex flex-col items-center justify-center min-w-8 min-h-8 rounded-lg bg-${color} bg-opacity-30 text-${color}`}>
        {darkMode.value ? <HiSun className="text-medium" /> : <HiMoon className="text-medium" />}
      </button>

      <motion.div animate={{ opacity: collapsed ? 0 : 1 }}>
          <span className="text-nowrap text-sm font-semibold">{darkMode.value ? "Светлая" : "Темная"} тема</span>
      </motion.div>
    </div>
  )
}