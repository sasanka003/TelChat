import { MouseEvent, MouseEventHandler } from "react";

export function EmptyState(props: {
  onChoice: (question: string) => any
}) {
  const handleClick = (e: MouseEvent) => {
    props.onChoice((e.target as HTMLDivElement).innerText);
  }
  return (
    <div className="p-8 rounded bg-[#25252d] flex flex-col items-center">
      <h1 className="text-4xl mb-4">AI Assistant</h1>
      <div className="flex w-full mt-12">
        <div onMouseUp={handleClick} className="p-4 mr-4 border rounded grow max-w-[50%] flex items-center justify-center text-center min-h-[84px] cursor-pointer hover:border-sky-600">
          What is my account balance?
        </div>
        <div onMouseUp={handleClick} className="p-4 ml-4 border rounded grow max-w-[50%] flex items-center justify-center text-center min-h-[84px] cursor-pointer hover:border-sky-600">
          Are there any doctor channelling service?
        </div>
      </div>
      <div className="flex w-full mt-4">
        <div onMouseUp={handleClick} className="p-4 mr-4 border rounded grow max-w-[50%] flex items-center justify-center text-center min-h-[84px] cursor-pointer hover:border-sky-600">
          How do i configure internet settings?
        </div>
        <div onMouseUp={handleClick} className="p-4 ml-4 border rounded grow max-w-[50%] flex items-center justify-center text-center min-h-[84px] cursor-pointer hover:border-sky-600">
          What is dialog customer care number?
        </div>
      </div>
    </div>
  );
}