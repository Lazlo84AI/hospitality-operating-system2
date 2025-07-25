import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChecklistComponent } from './ChecklistComponent';
import { ReminderModal } from './modals/ReminderModal';
import { MembersModal } from './modals/MembersModal';
import { EscalationModal } from './modals/EscalationModal';
import { ChecklistModal } from './modals/ChecklistModal';
import { Clock, CheckSquare, Users, TrendingUp, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    title: string;
    location: string;
    statut: string;
    priority: string | null;
    assignedTo: string;
    hoursElapsed: number;
    overdue: boolean;
    description?: string;
    type?: string;
  };
}

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [comment, setComment] = useState('');
  const [checklists, setChecklists] = useState<any[]>([]);
  
  // États pour les modales
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  const getStatusColor = (statut: string) => {
    if (statut === 'À traiter') return 'bg-green-500 text-white';
    if (statut === 'En cours') return 'bg-palace-navy text-white';
    return 'bg-muted text-soft-pewter border-border';
  };

  const formatElapsedTime = (hours: number) => {
    if (hours < 24) {
      return `Depuis ${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `Depuis ${days}j`;
    }
  };

  const handleAddChecklist = (title: string) => {
    const newChecklist = {
      id: Date.now().toString(),
      title,
      items: []
    };
    setChecklists([...checklists, newChecklist]);
    setShowChecklistModal(false);
  };

  const handleDeleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl luxury-card">
          <DialogHeader>
            <DialogTitle className="font-playfair text-xl text-palace-navy">
              Détails de la Relance
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-palace-navy mb-3">
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getStatusColor(task.statut)}>
                  {task.statut}
                </Badge>
                <span className="text-xs text-soft-pewter px-2 py-1 bg-muted rounded">
                  {task.type || 'Relance'}
                </span>
                {task.priority === 'urgence' && (
                  <Badge className="bg-urgence-red text-white animate-pulse">
                    URGENCE
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-palace-navy">Assigné à:</span>
                <p className="mt-1 text-palace-navy">{task.assignedTo}</p>
              </div>
              <div>
                <span className="font-medium text-palace-navy">Localisation:</span>
                <p className="mt-1">{task.location}</p>
              </div>
              <div>
                <span className="font-medium text-palace-navy">Temps écoulé:</span>
                <p className={cn("mt-1 font-medium", task.overdue ? "text-urgence-red" : "text-palace-navy")}>
                  {formatElapsedTime(task.hoursElapsed)}
                </p>
              </div>
              <div>
                <span className="font-medium text-palace-navy">Statut:</span>
                <p className="mt-1">{task.statut}</p>
              </div>
            </div>

            {task.description && (
              <div>
                <span className="font-medium text-palace-navy">Description:</span>
                <p className="mt-2 text-soft-pewter">{task.description}</p>
              </div>
            )}

            {/* Barre d'outils */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setShowReminderModal(true)}
              >
                <Clock className="h-4 w-4 text-palace-navy" />
                <span className="text-sm text-palace-navy">Reminder</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setShowChecklistModal(true)}
              >
                <CheckSquare className="h-4 w-4 text-palace-navy" />
                <span className="text-sm text-palace-navy">Checklist</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setShowMembersModal(true)}
              >
                <Users className="h-4 w-4 text-palace-navy" />
                <span className="text-sm text-palace-navy">Membres</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => setShowEscalationModal(true)}
              >
                <TrendingUp className="h-4 w-4 text-palace-navy" />
                <span className="text-sm text-palace-navy">Escalade</span>
              </Button>
            </div>

            {/* Affichage des checklists */}
            {checklists.map((checklist) => (
              <ChecklistComponent
                key={checklist.id}
                title={checklist.title}
                onDelete={() => handleDeleteChecklist(checklist.id)}
              />
            ))}

            {/* Commentaires et activité */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-palace-navy" />
                  <h4 className="font-semibold text-palace-navy">Commentaires et activité</h4>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowActivityDetails(!showActivityDetails)}
                  className="text-sm"
                >
                  {showActivityDetails ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Masquer les détails
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Afficher les détails
                    </>
                  )}
                </Button>
              </div>

              {/* Zone de commentaire */}
              <div className="mb-4">
                <Textarea
                  placeholder="Écrivez un commentaire…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Historique d'activité */}
              {showActivityDetails && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        MD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-palace-navy">Tâche créée</span>
                          <span className="text-xs text-soft-pewter">{formatElapsedTime(task.hoursElapsed)}</span>
                        </div>
                        <p className="text-sm">Cette relance a été créée automatiquement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button className="bg-champagne-gold text-palace-navy hover:bg-champagne-gold/90">
                Changer le statut
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modales secondaires */}
      <ReminderModal 
        isOpen={showReminderModal} 
        onClose={() => setShowReminderModal(false)} 
      />
      <MembersModal 
        isOpen={showMembersModal} 
        onClose={() => setShowMembersModal(false)} 
      />
      <EscalationModal 
        isOpen={showEscalationModal} 
        onClose={() => setShowEscalationModal(false)} 
      />
      <ChecklistModal 
        isOpen={showChecklistModal} 
        onClose={() => setShowChecklistModal(false)} 
        onAdd={handleAddChecklist}
      />
    </>
  );
}