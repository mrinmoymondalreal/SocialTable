import { isUserLoggedIn } from "@/lib/user";
import Logout from "./Logout";

export default async function Header({ isLogged }: { isLogged?: boolean }){
  let user = await isUserLoggedIn();
  console.log(user);
  return (
    <div id="header" className="w-full h-[44px] 
    flex items-center
    border-b border-gray-800 dark:border-gray-400">

      <div className="flex-grow flex-1 flex ml-4 md:justify-center items-center">
        <div className="text-primary">SocialTable</div>&nbsp;|&nbsp;<div>{ user ? user.name : "Welcome" }</div>
      </div>

      <div className="flex-shrink mr-4">
        {
          user && <Logout/>
        }
      </div>

    </div>
  );
}