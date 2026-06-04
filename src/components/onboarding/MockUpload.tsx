import { useRef, useState } from 'react'
import { Upload, FileCheck, X } from 'lucide-react'

type Props = {
  multiple?: boolean
  onChange: (names: string[]) => void
  value: string[]
}

export default function MockUpload({ multiple = false, onChange, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const names = Array.from(files).map((f) => f.name)
    onChange(multiple ? [...value, ...names] : [names[0]])
  }

  const remove = (name: string) => onChange(value.filter((n) => n !== name))

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={`cursor-pointer rounded-sm border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? 'border-wine bg-wine/5' : 'border-stone/30 hover:border-wine'
        }`}
      >
        <Upload size={40} className="mx-auto text-wine mb-3" strokeWidth={1.5} />
        <p className="text-ink font-medium">גררי את הקובץ לכאן או לחצי לבחירה</p>
        <p className="text-sm text-stone mt-1">PDF, JPG או PNG</p>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {value.length > 0 && (
        <ul className="mt-4 space-y-2">
          {value.map((name) => (
            <li
              key={name}
              className="flex items-center justify-between gap-3 bg-white/60 border border-stone/15 rounded-sm px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck size={20} className="text-green-600 shrink-0" />
                <span className="truncate text-ink">{name}</span>
                <span className="text-green-600 text-sm shrink-0">מאומת ✓</span>
              </div>
              <button
                onClick={() => remove(name)}
                className="text-stone hover:text-wine shrink-0 flex items-center gap-1 text-sm"
              >
                {multiple ? <X size={16} /> : 'החליפי קובץ'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
