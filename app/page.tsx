import Post from "@/components/Post";

export default function Home() {
  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      <div className="heading text-3xl">your feed</div>
      <div className="feed space-y-3">
        {new Array(10).fill(0).map(_=><Post
          name="themrinmoymondal"
          caption="Captions Here"
          noComment={24}
          noLike={100}
          time={new Date().getTime()}
        />)}
      </div>
    </main>
  );
}
