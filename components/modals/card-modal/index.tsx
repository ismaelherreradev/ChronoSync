'use client'

import { useCardModal } from '@/hooks/use-card-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export function CardModal() {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1>Card Modal</h1>
      </DialogContent>
    </Dialog>
  )
}
