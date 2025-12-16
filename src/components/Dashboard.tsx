import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Fish, 
  Ship, 
  TrendingUp, 
  MapPin,
  Calendar,
  Weight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fishCatchData = [
  { name: 'Tuna', value: 1250, color: '#0891b2' },
  { name: 'Cakalang', value: 950, color: '#059669' },
  { name: 'Tongkol', value: 780, color: '#0284c7' },
  { name: 'Kembung', value: 620, color: '#06b6d4' },
  { name: 'Tenggiri', value: 540, color: '#0ea5e9' },
];

const recentLogbooks = [
  {
    id: 1,
    shipName: 'Bahari Jaya I',
    captain: 'Budi Santoso',
    date: '2024-03-15',
    location: 'Laut Jawa',
    totalCatch: 2.5,
    status: 'pending',
    fishTypes: ['Tuna', 'Cakalang']
  },
  {
    id: 2,
    shipName: 'Nelayan Maju',
    captain: 'Slamet Riadi',
    date: '2024-03-14',
    location: 'Selat Sunda',
    totalCatch: 3.2,
    status: 'approved',
    fishTypes: ['Tongkol', 'Kembung']
  },
  {
    id: 3,
    shipName: 'Samudra Indah',
    captain: 'Agus Wijaya',
    date: '2024-03-14',
    location: 'Laut Banda',
    totalCatch: 1.8,
    status: 'pending',
    fishTypes: ['Tenggiri', 'Tuna']
  },
];

export function Dashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Disetujui</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Dashboard Admin DKP</h1>
          <p className="text-slate-600 mt-1">Monitoring hasil tangkapan ikan - Bulan Maret 2024</p>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Terakhir diperbarui: Hari ini, 14:30</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Logbook Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">124</p>
                <p className="text-xs text-green-600">+12% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Hasil Tangkapan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Weight className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">4,140</p>
                <p className="text-xs text-slate-600">ton</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Kapal Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Ship className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">87</p>
                <p className="text-xs text-slate-600">kapal terdaftar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Menunggu Validasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">3</p>
                <p className="text-xs text-slate-600">logbook pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fish Catch Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="w-5 h-5 text-cyan-600" />
              Hasil Tangkapan per Jenis Ikan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fishCatchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value} ton`, 'Hasil Tangkapan']}
                  labelStyle={{ color: '#334155' }}
                />
                <Bar dataKey="value" fill="#0891b2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Peta Lokasi Tangkapan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-dashed border-cyan-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <p className="text-slate-600">Peta Interaktif</p>
                <p className="text-sm text-slate-500">Lokasi tangkapan akan ditampilkan di sini</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Logbooks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-600" />
              Logbook Terbaru
            </div>
            <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-600 hover:bg-cyan-50">
              Lihat Semua
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Kapal</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Tanggal</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Lokasi</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Total Tangkapan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Jenis Ikan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentLogbooks.map((logbook) => (
                  <tr key={logbook.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-slate-800">{logbook.shipName}</p>
                        <p className="text-xs text-slate-500">{logbook.captain}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{logbook.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{logbook.location}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{logbook.totalCatch} ton</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {logbook.fishTypes.map((fish, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {fish}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(logbook.status)}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}