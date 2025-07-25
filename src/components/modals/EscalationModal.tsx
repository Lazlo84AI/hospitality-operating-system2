import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers = [
  {
    name: 'Jean Dupont',
    role: 'Responsable Maintenance',
    initials: 'JD',
    id: 'JD'
  },
  {
    name: 'Sophie Martin',
    role: 'Responsable Réception',
    initials: 'SM',
    id: 'SM'
  },
  {
    name: 'Marie Dubois',
    role: 'Gouvernante Générale',
    initials: 'MD',
    id: 'MD'
  },
  {
    name: 'Wilfried de Renty',
    role: 'Directeur',
    initials: 'WR',
    id: 'WR'
  }
];

export function EscalationModal({ isOpen, onClose }: EscalationModalProps) {
  const [escalationMethod, setEscalationMethod] = useState<'email' | 'whatsapp'>('email');
  const [selectedMember, setSelectedMember] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedMember) return;
    
    console.log(`Escalade via ${escalationMethod} vers ${selectedMember}`);
    // Ici on peut ajouter la logique d'envoi
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md luxury-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-lg text-palace-navy">
            Choix du canal
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Sélection du canal */}
          <div>
            <RadioGroup 
              value={escalationMethod} 
              onValueChange={(value) => setEscalationMethod(value as 'email' | 'whatsapp')}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="text-sm text-palace-navy">
                  Envoi d'un email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp" className="text-sm text-palace-navy">
                  Envoi d'un message WhatsApp
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Section Attribution de membres */}
          <div>
            <h3 className="font-playfair text-lg text-palace-navy mb-4">
              Attribution de membres
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-palace-navy">Membres</label>
                <Input
                  placeholder="Rechercher des membres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-palace-navy mb-3">Membres de l'annuaire de l'hôtel</h5>
                <div className="space-y-2">
                  {filteredMembers.map((member) => (
                    <div 
                      key={member.id}
                      className={cn(
                        "flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors",
                        selectedMember === member.id && "bg-blue-100 border border-blue-300"
                      )}
                      onClick={() => setSelectedMember(member.id)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <span className="text-sm text-palace-navy font-medium">{member.name}</span>
                        <p className="text-xs text-soft-pewter">{member.role}</p>
                      </div>
                      {selectedMember === member.id && (
                        <span className="text-xs text-blue-600">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bouton Envoyé */}
          <div className="flex justify-end">
            <Button
              onClick={handleSend}
              disabled={!selectedMember}
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
            >
              Envoyé
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}