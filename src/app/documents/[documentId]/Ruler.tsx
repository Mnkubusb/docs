
import { set } from "date-fns";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
const markers = Array.from({ length: 83 }, (_ , i) => i );

export const Ruler = () => { 

    const [leftMargin , setLeftMargin] = useState(56);
    const [rightMargin , setRightMargin] = useState(56);
    
    const [isDraggingLeft , setIsDraggingLeft] = useState(false);
    const [isDraggingRight , setIsDraggingRight] = useState(false);
    const rulerRef = useRef<HTMLDivElement>(null);

    const handleLeftMouseDown = () => {
        setIsDraggingLeft(true);
    }
    const handleRightMouseDown = () => {
        setIsDraggingRight(true);
    }
     
    const handleMouseMove = (e: React.MouseEvent ) => {
        console.log(e);
        if((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector("#ruler-container");
            if(container) {
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const rawPosition = Math.max(0, Math.min(816, relativeX));

                if(isDraggingLeft) {
                    const maxLeftPosition = 816 - rightMargin -100;
                    const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPosition); //TODO Make Collaborative
                }else if(isDraggingRight) {
                    const maxRightPosition = 816 - (leftMargin + 100);
                    const newRightPosition = Math.min(816 - rawPosition, 0);
                    const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
                    setRightMargin(constrainedRightPosition);
                }
            }
        }
    }

    const handleMouseUp = () => {
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
    };

    const handleLeftDoubleClick = () => {
        setLeftMargin(56);
    }
    const handleRightDoubleClick = () => {
        setRightMargin(56);
    }


    return (
        <div ref={rulerRef}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
            <div id="ruler-container" className="max-w-[816px] mx-auto w-full h-full relative">
                <Marker 
                    positiom={56}
                    isLeft={true}
                    isDragging={false}
                    onMouseDown={() => {}}
                    onDoubleClick={() => {}} 
                 />
                <Marker 
                    positiom={56}
                    isLeft={false}
                    isDragging={false}
                    onMouseDown={() => {}}
                    onDoubleClick={() => {}} 
                 />
                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className="relative h-full w-[816px]">
                        {
                            markers.map((marker) =>{
                                const position = (marker * 816) / 82;

                                return (
                                    <div 
                                        key={marker} 
                                        className="absolute bottom-0"
                                        style={{ left: `${position}px` }}
                                    >
                                        { marker%10===0 &&(
                                            <>
                                                <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                                                <span className="absolute bottom-2 text-[10px] text-neutral-500 trasform -translate-x-1/2 ">{marker/10 + 1}</span>
                                            </>
                                        )}
                                        {marker%5===0 && marker % 10 !== 0 &&(
                                            <>
                                                <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-400" />
                                            </>
                                        )}
                                        {marker%5 !== 0 && marker % 10 !== 0 &&(
                                            <>
                                                <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-300" />
                                            </>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }


  interface MarkerProps{
    positiom: number
    isLeft: boolean
    isDragging: boolean
    onMouseDown : () => void
    onDoubleClick : () => void  
  }

  const Marker = ({ positiom, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
    console.log(isDragging);
    return (
        <div 
            className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
            style={{ [isLeft? "left":"right" ]: `${positiom}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}    
        >
            <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 tranform -translate-x-1/2" />
        </div>
    )
  }