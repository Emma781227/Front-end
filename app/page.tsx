"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
// import { CiUser } from "react-icons";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import React from "react";
import {Button} from "@nextui-org/react";


export default function Home() {
  return (
    <section className="bg-gradient-to-r min-h-screen bg-background font-sans antialiased bg-gradient-to-r from-purple-300  via-green-100 to-purple-300" >
        {/* {container} */}
    <div className="bg-gradient-to-r block h-screen items-center justify-center p-4 md:flex">
      {/* {login card} */}
      <div className="bd-cover bg-image flex flex-col items-center  max-w-screen-lg overflow-hidden rounded-lg shadow-lg text-gray-600 w-full md:flex-row">
        {/* {logo} */}
        <div className="backdrop-blur-sm backdrop-filter py-44  p-4 text-white w-full md:w-1/2">
          <h1 className="font-medium text-xl absolute top-0  ">
                COMPANY LOGO
          </h1>
          <div className=" flex flex-col  ">
            <h1 className="font-medium absolute py-12 "> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem nobis fugit vero, rem voluptates doloribus accusa</h1>
            </div>
            <div className=" flex flex-col  ">
            <p className="font-medium text-5xl absolute  "> Welcom to....</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium absolute bottom-0">Lorem, ipsum dolor sit amet consectetur </p>
            </div>
            
          
          

        </div>
        

        {/* {form} */}
        <div className="bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2">

          {/* {welcome} */}
          <div className="flex flex-col left-0">
            <h1 className="font-medium text-purple-400 text-xl ">Login</h1>
            <p className="text-gray-250 italic text-sm">Welcome! Login to get amazing discount and offers only for you</p>
          </div>

          {/* {inputs} */}
          <form className="flex flex-col items-center space-y-4 ">
            
            <div className="relative">
              <p className="text-gray-250 italic text-sm"> username</p>
              {/* <span className="absolute flex  items-center pl-0 py-1 text-gray-400"><CiUser /></span> */}
              <input className="border border-gray-300 outline-none placeholder-gray-400 pl-20 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" placeholder="Username.." type="text"/>
            </div>

            <div className="relative">
            <p className="text-gray-250 italic text-sm"> Password</p>
              {/* <span className="absolute flex  items-center pl-4 text-gray-400"><FaLock /></span> */}
              <input className="border border-gray-300 outline-none placeholder-gray-400 pl-20 pr-1 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" placeholder="Password" type="text"/>
            </div>

            <div className="relative">
              <input type="checkbox" id="myCheckbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="myCheckbox" className="ml-2 text-gray-700">
               Check this box
                </label>
            </div>
         
              
           
              
            {/* <CiUser className="mr-2"/> */}
            
            
            <Link className="bg-purple-300 font-medium inline-flex  items-center px-10 py-2  rounded-md shadow-md text-white transition hover:bg-green-500" type="submit"  color="primary" variant="solid" href="/Home">
            
            Login
      
      </Link>
     
           
            
          
          </form>
          <div className="flex flex-col left-0 ">
            <p className="italic">
              New user?  <Link className="text-purple-200 cursor-pointer" href="/signup"> SignUp</Link>
            </p>

            <div className="flex flex-col right-0">
            <p className="flex flex-col text-gray-300 italic "> Forgot Your Password?</p>
          </div>
          </div>
          
        </div>
      </div>
    </div>
    </section>
  );
}
