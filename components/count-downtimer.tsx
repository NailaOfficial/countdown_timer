"use client";

import { useState, useRef, useEffect,ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Countdown (){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration >0)
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current)

            }   
    };

     const handleStart =(): void =>{
        if(timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
     };

     const handlePause = (): void => {
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
     };

     const handleReset = (): void =>{
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
     };

     useEffect(() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
             setTimeLeft((prevTime) => {
                if(prevTime <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1;
             }) ;
        }, 1000);
    }
    return () => {
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
}, [isActive,isPaused]);

const formateTime = (time: number): string =>{
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    
 };

 const handledurationChange =(e: ChangeEvent<HTMLInputElement>):void =>{
    setDuration(Number(e.target.value) || "");
 };
return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-teal-400 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handledurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-teal-400"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-black">
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-teal-400 mb-8 text-center">
          {formateTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-black">
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-black">
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-black">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
  

}