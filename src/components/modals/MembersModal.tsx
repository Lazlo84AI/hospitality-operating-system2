import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MembersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers = [
  {
    name: 'Jean Dupont',
    role: 'Responsable Maintenance',
    initials: 'JD',
    bgColor: 'bg-blue-600'
  },
  {
    name: 'Sophie Martin',
    role: 'Responsable Réception',
    initials: 'SM',
    bgColor: 'bg-green-600'
  },
  {
    name: 'Marie Dubois',
    role: 'Gouvernante Générale',
    initials: 'MD',
    bgColor: 'bg-purple-600'
  },
  {
    name: 'Wilfried de Renty',
    role: 'Directeur',
    initials: 'WR',
    bgColor: 'bg-blue-600'
  }
];

export function MembersModal({ isOpen, onClose }: MembersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberClick = (member: typeof teamMembers[0]) => {
    console.log('Member selected:', member);
    // Ici on peut ajouter la logique d'assignation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md luxury-card">
        <DialogHeader>
          <DialogTitle className="font-playfair text-lg text-palace-navy">
            Attribution de membres
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="members" className="text-sm">
                👥 Membres
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="space-y-4">
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
                      key={member.initials}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleMemberClick(member)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${member.bgColor} text-white text-xs`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <span className="text-sm text-palace-navy font-medium">{member.name}</span>
                        <p className="text-xs text-soft-pewter">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}