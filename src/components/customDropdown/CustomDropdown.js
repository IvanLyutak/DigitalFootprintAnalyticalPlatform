import { useState, useEffect, useRef } from "react"

import "./CustomDropdown.css"
import chevron from "../../images/chevron-down.svg"

function CustomDropdown({selectedType, setSelectedType, options}) {
    const [isActive, setIsActive] = useState(false);
    const [open, setOpen] = useState(true);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsActive(false)
            setOpen(true)

          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [wrapperRef]);

    return (
        <div className="customDropdown">
        <div className="dropdown" ref={wrapperRef}>
            <div className="dropdownList-btn" 
                onClick={() => {
                    setIsActive(!isActive) 
                    setOpen(!open)
                }}>
                    {selectedType}
                { open ?  <img src={chevron}  alt="" className="chevronItemList"/> : <img src={chevron} style={{transform: "rotate(180deg)"}} alt="" className="chevronItemList"/> }
            </div>
            {isActive && (
                <div className="dropdownList-content">
                    {options.map(option => (
                        <div onClick={e => {
                                        setSelectedType(option) 
                                        setIsActive(false)
                                        setOpen(true)
                                    }} className="dropdownList-item" key={Math.random()}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    )
}

export default CustomDropdown