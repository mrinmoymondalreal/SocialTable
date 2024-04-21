import { isUserLoggedIn } from "@/lib/user";
import Logout from "./Logout";
import Link from "next/link";

export default async function Header({ isLogged }: { isLogged?: boolean }){
  let user = await isUserLoggedIn();
  return (
    <div id="header" className="w-full h-[44px] 
    flex items-center
    border-b border-gray-800 dark:border-gray-400">
      
      <div className="flex-shrink-0 ml-4 flex justify-center items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={user?.picture} alt="" />
        </div>
      </div>

      <div className="flex-grow flex-1 flex ml-4 md:justify-center items-center">
        <div className="text-primary"><Link href="/">SocialTable</Link></div>
        &nbsp;|&nbsp;
        <div className="group">
          { user ? <Link href={"/user/"+user.username} className="md:text-base text-xs">{user.name}</Link> : "Welcome" }
          <div className="absolute w-fit p-2 bg-[#262626] 
          border-2 border-white 
          mt-4 shadow-lg rounded-md
          hidden
          -translate-x-1/2 group-hover:flex ">
            {user?.followers} Followers | {user?.following} Following | {user?.posts} Posts
          </div>
        </div>
      </div>

      <div className="flex-shrink mr-4 flex items-center space-x-2">
      <Link href="/search" className="dark:text-white border dark:border-white rounded-md px-2">Search</Link>
        {
          user ? <Logout/> : <Link href="/">Login</Link>
        }
      </div>

    </div>
  );
}