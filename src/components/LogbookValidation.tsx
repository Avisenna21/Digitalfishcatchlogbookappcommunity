import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Fish, 
  MapPin,
  Calendar,
  Weight,
  Camera,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

const pendingLogbooks = [
  {
    id: 1,
    shipName: 'Bahari Jaya I',
    captain: 'Budi Santoso',
    submitDate: '2024-03-16 09:30',
    tripDate: '2024-03-10 - 2024-03-15',
    location: { lat: -6.175, lng: 106.827, name: 'Laut Jawa' },
    catches: [
      { fish: 'Tuna', amount: 150, unit: 'kg', gear: 'Pancing Tonda' },
      { fish: 'Cakalang', amount: 200, unit: 'kg', gear: 'Pancing Tonda' }
    ],
    totalCatch: 350,
    photos: [
      'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300',
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=300'
    ],
    notes: 'Cuaca baik, angin tenang. Hasil tangkapan memuaskan.',
    status: 'pending'
  },
  {
    id: 2,
    shipName: 'Samudra Indah',
    captain: 'Agus Wijaya',
    submitDate: '2024-03-16 14:15',
    tripDate: '2024-03-12 - 2024-03-16',
    location: { lat: -5.124, lng: 119.456, name: 'Laut Banda' },
    catches: [
      { fish: 'Tenggiri', amount: 180, unit: 'kg', gear: 'Jaring Insang' }
    ],
    totalCatch: 180,
    photos: [
      'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300'
    ],
    notes: 'Trip singkat karena cuaca mulai buruk.',
    status: 'pending'
  },
  {
    id: 3,
    shipName: 'Harapan Jaya',
    captain: 'Dedi Kurniawan',
    submitDate: '2024-03-17 08:45',
    tripDate: '2024-03-14 - 2024-03-16',
    location: { lat: -6.200, lng: 106.850, name: 'Teluk Jakarta' },
    catches: [
      { fish: 'Kembung', amount: 80, unit: 'kg', gear: 'Pukat Cincin' },
      { fish: 'Selar', amount: 60, unit: 'kg', gear: 'Pukat Cincin' }
    ],
    totalCatch: 140,
    photos: [],
    notes: 'Hasil tangkapan menurun dibanding trip sebelumnya.',
    status: 'pending'
  }
];

export function LogbookValidation() {
  const [logbooks, setLogbooks] = useState(pendingLogbooks);
  const [selectedLogbook, setSelectedLogbook] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rejectReason, setRejectReason] = useState('');

  const filteredLogbooks = logbooks.filter(logbook => {
    const matchesSearch = logbook.shipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         logbook.captain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || logbook.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (logbookId: number) => {
    setLogbooks(logbooks.map(log => 
      log.id === logbookId ? { ...log, status: 'approved' } : log
    ));
    setIsDetailOpen(false);
    // Here you would typically send the approval to your backend
  };

  const handleReject = (logbookId: number, reason: string) => {
    setLogbooks(logbooks.map(log => 
      log.id === logbookId ? { ...log, status: 'rejected', rejectReason: reason } : log
    ));
    setIsDetailOpen(false);
    setRejectReason('');
    // Here you would typically send the rejection to your backend
  };

  const handleRequestRevision = (logbookId: number, notes: string) => {
    setLogbooks(logbooks.map(log => 
      log.id === logbookId ? { ...log, status: 'revision', revisionNotes: notes } : log
    ));
    setIsDetailOpen(false);
    // Here you would typically send the revision request to your backend
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Disetujui</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      case 'revision':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><MessageSquare className="w-3 h-3 mr-1" />Perlu Revisi</Badge>;
      default:
        return null;
    }
  };

  const pendingCount = logbooks.filter(log => log.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Validasi Logbook</h1>
          <p className="text-slate-600 mt-1">Review dan validasi logbook hasil tangkapan dari nelayan</p>
        </div>
        <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
          {pendingCount} Menunggu Validasi
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nama kapal atau kapten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
                <SelectItem value="revision">Perlu Revisi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{logbooks.filter(l => l.status === 'pending').length}</p>
                <p className="text-sm text-slate-600">Menunggu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{logbooks.filter(l => l.status === 'approved').length}</p>
                <p className="text-sm text-slate-600">Disetujui</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{logbooks.filter(l => l.status === 'rejected').length}</p>
                <p className="text-sm text-slate-600">Ditolak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{logbooks.filter(l => l.status === 'revision').length}</p>
                <p className="text-sm text-slate-600">Perlu Revisi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logbooks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-slate-600" />
            Daftar Logbook Masuk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Kapal & Kapten</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Tanggal Trip</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Lokasi</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Total Tangkapan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Tanggal Submit</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLogbooks.map((logbook) => (
                  <tr key={logbook.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-slate-800">{logbook.shipName}</p>
                        <p className="text-xs text-slate-500">{logbook.captain}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{logbook.tripDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{logbook.location.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">{logbook.totalCatch} kg</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{logbook.submitDate}</td>
                    <td className="px-4 py-3">{getStatusBadge(logbook.status)}</td>
                    <td className="px-4 py-3">
                      <Dialog open={isDetailOpen && selectedLogbook?.id === logbook.id} onOpenChange={setIsDetailOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-cyan-600 hover:text-cyan-700"
                            onClick={() => setSelectedLogbook(logbook)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Fish className="w-5 h-5 text-cyan-600" />
                              Detail Logbook - {selectedLogbook?.shipName}
                            </DialogTitle>
                          </DialogHeader>
                          
                          {selectedLogbook && (
                            <div className="space-y-6">
                              {/* Basic Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm text-slate-500">Kapal & Kapten</Label>
                                  <p className="text-sm text-slate-800">{selectedLogbook.shipName} - {selectedLogbook.captain}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-slate-500">Tanggal Trip</Label>
                                  <p className="text-sm text-slate-800">{selectedLogbook.tripDate}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-slate-500">Lokasi Tangkapan</Label>
                                  <p className="text-sm text-slate-800">{selectedLogbook.location.name}</p>
                                  <p className="text-xs text-slate-500">
                                    {selectedLogbook.location.lat}, {selectedLogbook.location.lng}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm text-slate-500">Total Tangkapan</Label>
                                  <p className="text-sm text-slate-800">{selectedLogbook.totalCatch} kg</p>
                                </div>
                              </div>

                              {/* Catch Details */}
                              <div>
                                <Label className="text-sm text-slate-500">Detail Hasil Tangkapan</Label>
                                <div className="mt-2 space-y-2">
                                  {selectedLogbook.catches.map((fishCatch: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <Badge variant="secondary">{fishCatch.fish}</Badge>
                                        <span className="text-sm text-slate-600">
                                          {fishCatch.amount} {fishCatch.unit}
                                        </span>
                                        <span className="text-xs text-slate-500">• {fishCatch.gear}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Photos */}
                              {selectedLogbook.photos.length > 0 && (
                                <div>
                                  <Label className="text-sm text-slate-500">Foto Hasil Tangkapan</Label>
                                  <div className="mt-2 grid grid-cols-3 gap-4">
                                    {selectedLogbook.photos.map((photo: string, index: number) => (
                                      <ImageWithFallback
                                        key={index}
                                        src={photo}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Notes */}
                              {selectedLogbook.notes && (
                                <div>
                                  <Label className="text-sm text-slate-500">Catatan</Label>
                                  <p className="text-sm text-slate-800 mt-1">{selectedLogbook.notes}</p>
                                </div>
                              )}

                              {/* Action Buttons */}
                              {selectedLogbook.status === 'pending' && (
                                <div className="flex gap-3 pt-4">
                                  <Button 
                                    onClick={() => handleApprove(selectedLogbook.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Setujui
                                  </Button>
                                  
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Tolak
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Tolak Logbook</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <Label>Alasan Penolakan</Label>
                                          <Textarea
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                            placeholder="Jelaskan alasan penolakan..."
                                            rows={4}
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <Button 
                                            onClick={() => handleReject(selectedLogbook.id, rejectReason)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            disabled={!rejectReason.trim()}
                                          >
                                            Tolak Logbook
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Minta Revisi
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogbooks.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Tidak ada logbook yang ditemukan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}