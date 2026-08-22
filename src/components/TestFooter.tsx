import { RotateCw } from "lucide-react"

interface TestFooterProps {
    onRestart: () => void;
}

function TestFooter({ onRestart }: TestFooterProps) {
  const handleRestart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    onRestart();
  }
  return (
    <div className="flex flex-col justify-between items-center">
        <button className="rounded-xl px-2 py-1.5 mb-4 bg-slate-700 text-slate-400 hover:text-slate-100" onClick={handleRestart}>
            <RotateCw/>
        </button>

        <div className="flex justify-center items-center gap-1">
            <span className="rounded text-sm bg-teal-400 text-teal-800 px-1 py-0.5">tab &gt; enter</span>
            <p className="text-slate-400"> - restart test</p>
        </div>
    </div>
  )
}

export default TestFooter