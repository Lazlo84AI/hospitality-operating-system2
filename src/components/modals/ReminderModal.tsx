import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const [reminderText, setReminderText] = useState('');
  const [reminderDate, setReminderDate] = useState<Date | undefined>(new Date());
  const [hasStartDate, setHasStartDate] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(true);
  const [deadlineTime, setDeadlineTime] = useState('23:30');
  const [reminderBefore, setReminderBefore] = useState('10 minutes avant');

  const handleSave = () => {
    console.log('Reminder saved:', {
      text: reminderText,
      date: reminderDate,
      hasStartDate,
      hasDeadline,
      deadlineTime,
      reminderBefore
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md luxury-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-lg text-palace-navy">
            🕓 Définir un reminder
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-palace-navy">Objet du reminder</label>
            <Input
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              className="mt-1"
              placeholder="Entrez l'objet du reminder"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-palace-navy">juillet 2025</h4>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={reminderDate}
              onSelect={setReminderDate}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={hasStartDate}
                onCheckedChange={(checked) => setHasStartDate(checked === true)}
                className="text-soft-pewter"
              />
              <span className="text-sm text-soft-pewter">Date de début</span>
              <Input 
                placeholder="J/M/AAAA" 
                disabled={!hasStartDate}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={hasDeadline}
                onCheckedChange={(checked) => setHasDeadline(checked === true)}
                className="text-blue-600"
              />
              <span className="text-sm text-palace-navy">Date limite</span>
              <Input 
                value="24/07/2025" 
                disabled={!hasDeadline}
                className="flex-1"
              />
              <Input 
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                disabled={!hasDeadline}
                className="w-20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-palace-navy">⏰ Définir un rappel</label>
            <Select value={reminderBefore} onValueChange={setReminderBefore}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5 minutes avant">5 minutes avant</SelectItem>
                <SelectItem value="10 minutes avant">10 minutes avant</SelectItem>
                <SelectItem value="30 minutes avant">30 minutes avant</SelectItem>
                <SelectItem value="1 heure avant">1 heure avant</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-soft-pewter mt-2">
              Les rappels seront envoyés à tous les membres et les observateurs de cette carte.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Effacer
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}