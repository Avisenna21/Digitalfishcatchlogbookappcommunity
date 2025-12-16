import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar,
  Filter,
  Fish,
  Ship,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', total: 3200, ships: 45, trips: 89 },
  { month: 'Feb', total: 3800, ships: 48, trips: 96 },
  { month: 'Mar', total: 4140, ships: 52, trips: 104 },
];

const fishTypeData = [
  { name: 'Tuna', value: 1250, percentage: 30.2, color: '#0891b2' },
  { name: 'Cakalang', value: 950, percentage: 22.9, color: '#059669' },
  { name: 'Tongkol', value: 780, percentage: 18.8, color: '#0284c7' },
  { name: 'Kembung', value: 620, percentage: 15.0, color: '#06b6d4' },
  { name: 'Lainnya', value: 540, percentage: 13.1, color: '#0ea5e9' },
];

const shipPerformanceData = [
  { shipName: 'Bahari Jaya I', trips: 24, totalCatch: 3200, avgPerTrip: 133.3, efficiency: 'Tinggi' },
  { shipName: 'Nelayan Maju', trips: 31, totalCatch: 3800, avgPerTrip: 122.6, efficiency: 'Tinggi' },
  { shipName: 'Samudra Indah', trips: 18, totalCatch: 2100, avgPerTrip: 116.7, efficiency: 'Sedang' },
  { shipName: 'Harapan Jaya', trips: 27, totalCatch: 2950, avgPerTrip: 109.3, efficiency: 'Sedang' },
  { shipName: 'Berkah Laut', trips: 22, totalCatch: 2200, avgPerTrip: 100.0, efficiency: 'Sedang' },
];

export function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-03-31'
  });
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [reportType, setReportType] = useState('summary');

  const handleDateChange = (field: string, value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    // Here you would typically trigger the export functionality
    console.log(`Exporting ${reportType} report as ${format}`);
    alert(`Laporan akan diunduh dalam format ${format.toUpperCase()}`);
  };

  const getEfficiencyBadge = (efficiency: string) => {
    switch (efficiency) {
      case 'Tinggi':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Tinggi</Badge>;
      case 'Sedang':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Sedang</Badge>;
      case 'Rendah':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rendah</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Laporan & Export Data</h1>
          <p className="text-slate-600 mt-1">Analisis dan ekspor data hasil tangkapan ikan</p>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            Filter Laporan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="reportType">Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Ringkasan</SelectItem>
                  <SelectItem value="detailed">Detail Lengkap</SelectItem>
                  <SelectItem value="by-ship">Per Kapal</SelectItem>
                  <SelectItem value="by-fish">Per Jenis Ikan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="period">Periode</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="quarterly">Triwulan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                  <SelectItem value="custom">Kustom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">Tanggal Akhir</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Laporan
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('pdf')}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('excel')}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-cyan-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <Fish className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">4,140</p>
                <p className="text-sm text-slate-600">Total Tangkapan (kg)</p>
                <p className="text-xs text-green-600">+12% dari periode lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Ship className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">52</p>
                <p className="text-sm text-slate-600">Kapal Aktif</p>
                <p className="text-xs text-green-600">+8% dari periode lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">104</p>
                <p className="text-sm text-slate-600">Total Trip</p>
                <p className="text-xs text-green-600">+18% dari periode lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl text-slate-800">39.8</p>
                <p className="text-sm text-slate-600">Rata-rata per Trip (kg)</p>
                <p className="text-xs text-red-600">-5% dari periode lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              Tren Hasil Tangkapan Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'total' ? `${value} kg` : value,
                    name === 'total' ? 'Total Tangkapan' : name === 'ships' ? 'Kapal Aktif' : 'Jumlah Trip'
                  ]}
                />
                <Line type="monotone" dataKey="total" stroke="#0891b2" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fish Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="w-5 h-5 text-emerald-600" />
              Distribusi Jenis Ikan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fishTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                >
                  {fishTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kg`, 'Hasil Tangkapan']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ship Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-slate-600" />
            Kinerja Per Kapal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Nama Kapal</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Jumlah Trip</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Total Tangkapan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Rata-rata per Trip</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Efisiensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {shipPerformanceData.map((ship, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-100 p-2 rounded-lg">
                          <Ship className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="text-sm text-slate-800">{ship.shipName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.trips}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{ship.totalCatch.toLocaleString()} kg</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{ship.avgPerTrip} kg</td>
                    <td className="px-4 py-3">{getEfficiencyBadge(ship.efficiency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fish Type Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fish className="w-5 h-5 text-slate-600" />
            Rekap per Jenis Ikan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Jenis Ikan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Total Tangkapan</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Persentase</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-600">Rata-rata per Trip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {fishTypeData.map((fish, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: fish.color }}
                        ></div>
                        <span className="text-sm text-slate-800">{fish.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">{fish.value.toLocaleString()} kg</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{fish.percentage}%</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{(fish.value / 104).toFixed(1)} kg</td>
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