import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export function ChecklistModal({ isOpen, onClose, onAdd }: ChecklistModalProps) {
  const [checklistTitle, setChecklistTitle] = useState('Checklist');

  const handleAdd = () => {
    onAdd(checklistTitle);
    setChecklistTitle('Checklist');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md luxury-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-lg text-palace-navy">
            Ajouter une checklist
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-palace-navy">Titre</label>
            <Input
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}