import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type WithdrawModalProps = {
  open: boolean
  max: number
  onClose: () => void
}

export default function WithdrawModal({ open, max, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState(max)

  useEffect(() => {
    if (open) setAmount(max)
  }, [open, max])

  const submit = () => {
    alert(`משיכה של ₪${amount.toLocaleString('he-IL')} אושרה ✓ (mock)`)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream max-w-md w-full rounded-sm shadow-2xl"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-stone/15">
              <h3 className="font-serif text-xl">משיכה לחשבון</h3>
              <button onClick={onClose} className="text-stone hover:text-ink">
                <X size={20} />
              </button>
            </header>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone mb-2">
                  סכום למשיכה
                </label>
                <input
                  type="number"
                  value={amount}
                  min={0}
                  max={max}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-transparent border-2 border-stone/30 focus:border-wine outline-none font-serif text-3xl py-2 px-3 rounded-sm"
                />
                <p className="text-xs text-stone mt-1">
                  זמין למשיכה: ₪{max.toLocaleString('he-IL')}
                </p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone mb-2">
                  חשבון בנק
                </label>
                <select
                  className="w-full bg-cream border-2 border-stone/30 focus:border-wine outline-none py-2 px-3 rounded-sm text-base"
                  defaultValue="default"
                >
                  <option value="default">בנק לאומי · XXXX-1234</option>
                </select>
              </div>
            </div>
            <footer className="px-6 py-4 border-t border-stone/15 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="text-sm text-stone hover:text-ink px-4 py-2"
              >
                ביטול
              </button>
              <button
                onClick={submit}
                disabled={amount <= 0 || amount > max}
                className="bg-wine text-cream text-sm px-6 py-2 rounded-full hover:bg-wine/90 disabled:opacity-30"
              >
                אשרי משיכה
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
