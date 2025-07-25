import { Heart, Clock, Eye, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReminderModal } from './modals/ReminderModal';
import { MembersModal } from './modals/MembersModal';
import { EscalationModal } from './modals/EscalationModal';
import { ChecklistModal } from './modals/ChecklistModal';
import { ChecklistComponent } from './ChecklistComponent';
import { useState } from 'react';

const clientRequests = [
  {
    id: 1,
    clientName: 'M. et Mme Anderson',
    room: 'Suite 201',
    request: 'Champagne Dom Pérignon et roses rouges',
    occasion: 'Anniversaire de mariage',
    status: 'À traiter',
    gouvernante: 'Claire Petit',
    daysSince: 2,
    priority: 'URGENCE'
  },
  {
    id: 2,
    clientName: 'Famille Dubois',
    room: 'Chambre 305',
    request: 'Lit bébé et produits hypoallergéniques',
    status: 'En cours',
    gouvernante: 'Marie Rousseau',
    daysSince: 1,
    priority: 'NORMAL'
  }
];

export function ClientRequestsCard() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [checklists, setChecklists] = useState<any[]>([]);
  
  // États pour les modales
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  const handleAddChecklist = (title: string) => {
    const newChecklist = {
      id: Date.now().toString(),
      title,
      items: []
    };
    setChecklists([...checklists, newChecklist]);
  };

  const handleDeleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'À traiter': return 'bg-green-500 text-white';
      case 'En cours': return 'bg-palace-navy text-white';
      default: return 'bg-muted text-soft-pewter';
    }
  };

  const getDaysSinceText = (days: number) => {
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Depuis 1 jour";
    return `Depuis ${days} jours`;
  };

  return (
    <>
      <div className="luxury-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Heart className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-playfair font-semibold text-palace-navy">
              Demandes Clients
            </h2>
            <p className="text-sm text-soft-pewter">
              Suivi des demandes spéciales
            </p>
          </div>
        </div>
        <span className="text-sm text-soft-pewter font-medium">
          {clientRequests.length} demandes
        </span>
      </div>

      <div className="space-y-4">
        {clientRequests.map((request) => (
          <div
            key={request.id}
            className="p-4 bg-muted/20 rounded-lg border border-border/30 hover-luxury transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-palace-navy">
                    {request.request}
                  </h3>
                  <Eye 
                    className="h-4 w-4 text-soft-pewter cursor-pointer hover:text-palace-navy" 
                    onClick={() => {
                      setSelectedRequest(request);
                      setIsDetailModalOpen(true);
                    }}
                  />
                </div>
                <p className="text-palace-navy mb-1">
                  {request.room}
                </p>
                <p className="text-sm text-soft-pewter mb-3">
                  {request.clientName}
                </p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  {request.priority === 'URGENCE' && (
                    <Badge className="bg-urgence-red text-white">
                      URGENCE
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/20">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-soft-pewter">Assigné à :</span>
                <span className="text-sm font-bold text-palace-navy">
                  Gouvernante : {request.gouvernante}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-urgence-red">
                <Clock className="h-4 w-4" />
                <span>{getDaysSinceText(request.daysSince)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-soft-pewter">Statuts aujourd'hui:</span>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs">{clientRequests.filter(r => r.status === 'À traiter').length} à traiter</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-soft-pewter" />
              <span className="text-xs">1 en cours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détail complet */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl luxury-card">
          <DialogHeader>
            <DialogTitle className="font-playfair text-xl text-palace-navy">
              Demande Client - Détails
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-palace-navy mb-3">
                  {selectedRequest.request}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                  {selectedRequest.priority === 'URGENCE' && (
                    <Badge className="bg-urgence-red text-white">URGENCE</Badge>
                  )}
                </div>
              </div>

              {/* Barre d'outils */}
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={() => setShowReminderModal(true)}>
                  <Clock className="h-4 w-4 mr-2" />Reminder
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowChecklistModal(true)}>
                  <CheckCircle className="h-4 w-4 mr-2" />Checklist
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowMembersModal(true)}>
                  <Users className="h-4 w-4 mr-2" />Membres
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowEscalationModal(true)}>
                  <TrendingUp className="h-4 w-4 mr-2" />Escalade
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modales secondaires */}
      <ReminderModal isOpen={showReminderModal} onClose={() => setShowReminderModal(false)} />
      <MembersModal isOpen={showMembersModal} onClose={() => setShowMembersModal(false)} />
      <EscalationModal isOpen={showEscalationModal} onClose={() => setShowEscalationModal(false)} />
      <ChecklistModal isOpen={showChecklistModal} onClose={() => setShowChecklistModal(false)} onAdd={handleAddChecklist} />
    </>
  );
}