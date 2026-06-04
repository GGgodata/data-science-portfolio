import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '../ui/Button'

export default function WithdrawModal({
  open,
  max,
  onClose,
}: {
  open: boolean
  max: number
  onClose: () => void
}) {
  const [amount, setAmount] = useState(max)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-sm w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-ink">משיכה לחשבון</h2>
              <button onClick={onClose} className="text-stone hover:text-wine">
                <X size={22} />
              </button>
            </div>

            <label className="block text-sm text-stone mb-2">סכום למשיכה</label>
            <input
              type="number"
              value={amount}
              max={max}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-white/60 border border-stone/20 focus:border-wine outline-none rounded-sm px-4 py-3 font-serif text-2xl text-ink mb-4"
            />

            <label className="block text-sm text-stone mb-2">חשבון בנק</label>
            <select className="w-full bg-white/60 border border-stone/20 focus:border-wine outline-none rounded-sm px-4 py-3 text-ink mb-6">
              <option>בנק הפועלים · ****1234</option>
              <option>בנק לאומי · ****5678</option>
            </select>

            <Button
              className="w-full"
              onClick={() => {
                alert(`בקשת משיכה של ₪${amount.toLocaleString()} נשלחה ✓`)
                onClose()
              }}
            >
              אשרי משיכה
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
