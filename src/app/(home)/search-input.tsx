"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import { useRef, useState } from "react"
import { useSearchParam } from "@/hooks/use-search-param"

export const SearchInput = () =>{

    const [ search , setSearch ] = useSearchParam()
    const [value , setValue] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleEvent =  (e : React.ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value);
    }

    const handleClear = ()=>{
        setValue("");
        inputRef.current?.blur();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    }

    return(
        <div className="flex-1 flex items-center justify-center ">
            <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-[720px]"
            >
                <Input
                    value={value}
                    onChange={handleEvent}
                    ref={inputRef}
                    placeholder="Search"
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
                />
                <Button 
                    type="submit"
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute rounded-full left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5"
                >
                    <SearchIcon  />
                </Button>
                {value && (
                      <Button 
                      type="button"
                      onClick={handleClear}
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute rounded-full right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5"
                  >
                      <XIcon/>
                  </Button>
                )}
            </form>
        </div>
    )
}