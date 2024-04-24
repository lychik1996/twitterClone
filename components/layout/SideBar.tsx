import { BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SidebarLogo from "./SIdebarLogo"
import SidebarItem from "./SidebarItem"
import { BiLogOut } from "react-icons/bi"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/userCurrentUser"
import { signOut } from "next-auth/react"

export default function SideBar(){
    const {data:currentUser} =useCurrentUser();
    const items =[
        {
            label:'Home',
            href:'/',
            icon:BsHouseFill,
            
        },
        {
            label:"Notifications",
            href:'/notifocations',
            icon:BsHouseFill,
            auth:true
        },
        {
            label:"Profile",
            href:'/user/123',
            icon:FaUser,
            auth:true
        }
    ]
    return(
        <>
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo/>
                    {items.map((item)=>(
                        <SidebarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        auth={item.auth}
                        />
                    ))}
                    {currentUser && (
                        <SidebarItem onClick={()=>signOut()} icon={BiLogOut} label="Logout"/>
                    )}
                    <SidebarTweetButton/>
                </div>

            </div>
        </div>
        </>
    )
}