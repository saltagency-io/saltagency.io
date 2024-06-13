import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ children, isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161423] bg-opacity-70 backdrop-blur-sm">
      <button
        className="absolute right-4 top-4 z-10 text-4xl font-bold text-white"
        onClick={onClose}
      >
        &times;
      </button>

      <motion.div
        className="relative mx-4 w-full max-w-[1024px] overflow-hidden rounded-[32px] bg-[#161423]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
