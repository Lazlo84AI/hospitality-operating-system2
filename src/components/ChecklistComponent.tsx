import { useState } from 'react';
import { X, Plus, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
  dueDate?: Date;
}

interface ChecklistComponentProps {
  title: string;
  onDelete: () => void;
}

const availableMembers = [
  { id: 'JD', name: 'Jean Dupont', initials: 'JD' },
  { id: 'SM', name: 'Sophie Martin', initials: 'SM' },
  { id: 'MD', name: 'Marie Dubois', initials: 'MD' },
  { id: 'WR', name: 'Wilfried de Renty', initials: 'WR' }
];

export function ChecklistComponent({ title, onDelete }: ChecklistComponentProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
      assignee: selectedAssignee || undefined,
      dueDate: selectedDate
    };

    setItems([...items, newItem]);
    setNewItemText('');
    setSelectedAssignee('');
    setSelectedDate(undefined);
    setShowAddItem(false);
  };

  const handleCancel = () => {
    setNewItemText('');
    setSelectedAssignee('');
    setSelectedDate(undefined);
    setShowAddItem(false);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="space-y-4 p-4 bg-muted/10 rounded-lg border">
      {/* Header avec titre et bouton supprimer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={items.length > 0 && items.every(item => item.completed)}
            disabled={items.length === 0}
          />
          <h4 className="font-bold text-palace-navy">{title}</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-soft-pewter hover:text-palace-navy"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Barre de progression */}
      {items.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-soft-pewter">{Math.round(progressPercentage)}%</span>
            <span className="text-soft-pewter">{completedCount}/{items.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      {/* Liste des items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 p-2 bg-background rounded border">
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <span className={`flex-1 text-sm ${item.completed ? 'line-through text-soft-pewter' : 'text-palace-navy'}`}>
              {item.text}
            </span>
            
            {/* Assignee Avatar */}
            {item.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-blue-600 text-white">
                  {availableMembers.find(m => m.id === item.assignee)?.initials}
                </AvatarFallback>
              </Avatar>
            )}
            
            {/* Due Date */}
            {item.dueDate && (
              <span className="text-xs text-soft-pewter">
                {format(item.dueDate, 'dd/MM')}
              </span>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteItem(item.id)}
              className="h-6 w-6 p-0 text-soft-pewter hover:text-palace-navy"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Zone d'ajout d'item */}
      {showAddItem ? (
        <div className="space-y-3 p-3 bg-background rounded border">
          <Input
            placeholder="Ajouter un élément"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="text-sm"
          />
          
          <div className="flex items-center space-x-2">
            {/* Bouton Assigné */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span className="text-xs">Assigné</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-palace-navy">Assigner à un membre</h5>
                  {availableMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-muted cursor-pointer"
                      onClick={() => setSelectedAssignee(member.id)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-blue-600 text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                      {selectedAssignee === member.id && (
                        <span className="text-xs text-green-600">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Bouton Date d'échéance */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">Échéance</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={handleAddItem}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Ajouter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddItem(true)}
          className="w-full flex items-center space-x-2 text-soft-pewter hover:text-palace-navy"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter un élément</span>
        </Button>
      )}
    </div>
  );
}