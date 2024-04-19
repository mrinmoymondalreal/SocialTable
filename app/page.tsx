import PerformLogin from "@/components/PerformLogin";
import Post from "@/components/Post";
import { isUserLoggedIn } from "@/lib/user";

export default async function Home() {
  let user = await isUserLoggedIn();
  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      { 
        !user ? <PerformLogin />
        :
        <>
        <div className="heading text-3xl">your feed</div>
        <div className="feed space-y-3">
          {new Array(10).fill(0).map((_, i)=><Post
            name="themrinmoymondal"
            caption="Captions Here"
            noComment={24}
            noLike={100}
            time={2*24*60*60*1000}
            index={i}
            key={i}
          />)}
        </div>
        </>
      }
    </main>
  );
}
