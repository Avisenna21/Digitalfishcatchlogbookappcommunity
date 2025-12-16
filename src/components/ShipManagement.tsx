import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Plus, 
  Ship, 
  User, 
  MapPin, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Anchor
} from 'lucide-react';

const shipsData = [
  {
    id: 1,
    name: 'Bahari Jaya I',
    gt: '25 GT',
    owner: 'CV. Bahari Sejahtera',
    captain: 'Budi Santoso',
    homePort: 'Muara Baru',
    status: 'active',
    lastTrip: '2024-03-15',
    totalTrips: 24
  },
  {
    id: 2,
    name: 'Nelayan Maju',
    gt: '18 GT',
    owner: 'Koperasi Nelayan Maju',
    captain: 'Slamet Riadi',
    homePort: 'Tanjung Priok',
    status: 'active',
    lastTrip: '2024-03-14',
    totalTrips: 31
  },
  {
    id: 3,
    name: 'Samudra Indah',
    gt: '32 GT',
    owner: 'PT. Samudra Indah',
    captain: 'Agus Wijaya',
    homePort: 'Paotere',
    status: 'maintenance',
    lastTrip: '2024-03-10',
    totalTrips: 18
  },
  {
    id: 4,
    name: 'Harapan Jaya',
    gt: '22 GT',
    owner: 'Yayasan Nelayan Harapan',
    captain: 'Dedi Kurniawan',
    homePort: 'Muara Baru',
    status: 'active',
    lastTrip: '2024-03-16',
    totalTrips: 27
  },
];

export function ShipManagement() {
  const [ships, setShips] = useState(shipsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gt: '',
    owner: '',
    captain: '',
    homePort: ''
  });

  const filteredShips = ships.filter(ship =>
    ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShip = {
      id: ships.length + 1,
      name: formData.name,
      gt: formData.gt,
      owner: formData.owner,
      captain: formData.captain,
      homePort: formData.homePort,
      status: 'active',
      lastTrip: new Date().toISOString().split('T')[0],
      totalTrips: 0
    };
    setShips([...ships, newShip]);
    setFormData({ name: '', gt: '', owner: '', captain: '', homePort: '' });
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Aktif</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Perawatan</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Tidak Aktif</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Data Kapal & Nelayan</h1>
          <p className="text-slate-600 mt-1">Manajemen data kapal dan informasi nelayan</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kapal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-cyan-600" />
                Tambah Data Kapal Baru
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Kapal</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama kapal"
                  required
                />
              </div>
              <div>
                <Label htmlFor="gt">Gross Tonnage (GT)</Label>
                <Input
                  id="gt"
                  name="gt"
                  value={formData.gt}
                  onChange={handleInputChange}
                  placeholder="Contoh: 25 GT"
                  required
                />
              </div>
              <div>
                <Label htmlFor="owner">Pemilik</Label>
                <Input
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  placeholder="Nama pemilik/perusahaan"
                  required
                />
              </div>
              <div>
                <Label htmlFor="captain">Kapten/Nahkoda</Label>
                <Input
                  id="captain"
                  name="captain"
                  value={formData.captain}
                  onChange={handleInputChange}
                  placeholder="Nama kapten"
                  required
                />
              </div>
              <div>
                <Label htmlFor="homePort">Pelabuhan Pangkalan</Label>
                <Input
                  id="homePort"
                  name="homePort"
                  value={formData.homePort}
                  onChange={handleInputChange}
                  placeholder="Nama pelabuhan"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Simpan
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nama kapal, kapten, atau pemilik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="text-slate-600">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-cyan-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <Ship className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{ships.length}</p>
                <p className="text-sm text-slate-600">Total Kapal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Anchor className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{ships.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-slate-600">Kapal Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">{ships.length}</p>
                <p className="text-sm text-slate-600">Nelayan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">3</p>
                <p className="text-sm text-slate-600">Pelabuhan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ships Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-slate-600" />
            Daftar Kapal Terdaftar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Kapal</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">GT</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Pemilik</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Kapten</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Pelabuhan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Trip Terakhir</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredShips.map((ship) => (
                  <tr key={ship.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-100 p-2 rounded-lg">
                          <Ship className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-800">{ship.name}</p>
                          <p className="text-xs text-slate-500">{ship.totalTrips} trip</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.gt}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.owner}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.captain}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.homePort}</td>
                    <td className="px-4 py-3">{getStatusBadge(ship.status)}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.lastTrip}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredShips.length === 0 && (
            <div className="text-center py-8">
              <Ship className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Tidak ada data kapal yang ditemukan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}