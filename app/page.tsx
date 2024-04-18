import heart from '@/public/heart.svg'


export default function Home() {
  return (
    <main className="mt-4 flex flex-col items-center gap-y-4">
      <div className="heading text-3xl">your feed</div>
      <div className="feed max-w-[600px] px-2 py-4 space-y-2">
        <div><div className="inline border-b text-primary">themrinmoymondal</div> posted 10 months ago</div>
        <div className="h-fit w-full py-2 box-border">
          <img src="/image.png" className="-rotate-2 max-w-full w-[100%] rounded-lg" alt="" />
        </div>
        <div className="">
          <div className="like">
            <img src="/unheart.svg" width="30" height="30" />
          </div>
        </div>
        <div id="caption" className="space-x-2">
          <div id="name" className="font-[500] inline">themrinmymondal</div>
          <div className="inline">Caption looks like this</div>
        </div>
      </div>
    </main>
  );
}
