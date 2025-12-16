import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  BookOpen, 
  MapPin, 
  Fish, 
  Camera, 
  Save, 
  Send,
  Calendar,
  Weight,
  Anchor,
  Clock,
  Upload
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const fishTypes = [
  'Tuna', 'Cakalang', 'Tongkol', 'Kembung', 'Tenggiri', 
  'Kakap', 'Barakuda', 'Layur', 'Selar', 'Teri'
];

const fishingGears = [
  'Pancing Tonda', 'Jaring Insang', 'Pukat Cincin', 'Rawai Tuna',
  'Jaring Lingkar', 'Bubu', 'Pancing Ulur', 'Payang'
];

export function LogbookInput() {
  const [formData, setFormData] = useState({
    departureDate: '',
    returnDate: '',
    latitude: '',
    longitude: '',
    fishType: '',
    catchAmount: '',
    unit: 'kg',
    fishingGear: '',
    notes: ''
  });
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [catchEntries, setCatchEntries] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages([...selectedImages, ...files]);
    }
  };

  const addCatchEntry = () => {
    if (formData.fishType && formData.catchAmount) {
      const newEntry = {
        id: Date.now(),
        fishType: formData.fishType,
        amount: formData.catchAmount,
        unit: formData.unit,
        gear: formData.fishingGear
      };
      setCatchEntries([...catchEntries, newEntry]);
      setFormData({
        ...formData,
        fishType: '',
        catchAmount: '',
        fishingGear: ''
      });
    }
  };

  const removeCatchEntry = (id: number) => {
    setCatchEntries(catchEntries.filter(entry => entry.id !== id));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Form submitted:', { formData, catchEntries, images: selectedImages, action });
    // Here you would typically send the data to your backend
    alert(`Logbook ${action === 'save' ? 'disimpan' : 'dikirim ke DKP'} berhasil!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Input Logbook Hasil Tangkapan</h1>
          <p className="text-slate-600 mt-1">Kapal: Bahari Jaya I - Kapten: Budi Santoso</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          Trip #025
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-600" />
                Informasi Trip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departureDate">Tanggal Berangkat</Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="returnDate">Tanggal Kembali</Label>
                  <Input
                    id="returnDate"
                    name="returnDate"
                    type="date"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fishing Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Lokasi Tangkapan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    placeholder="Contoh: -6.175392"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    placeholder="Contoh: 106.827153"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-dashed border-cyan-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm">Klik untuk pilih lokasi di peta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Catch Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-blue-600" />
                Detail Hasil Tangkapan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fishType">Jenis Ikan</Label>
                  <Select value={formData.fishType} onValueChange={(value) => handleSelectChange('fishType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis ikan" />
                    </SelectTrigger>
                    <SelectContent>
                      {fishTypes.map((fish) => (
                        <SelectItem key={fish} value={fish}>{fish}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="catchAmount">Jumlah Tangkapan</Label>
                  <div className="flex gap-2">
                    <Input
                      id="catchAmount"
                      name="catchAmount"
                      type="number"
                      placeholder="0"
                      value={formData.catchAmount}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <Select value={formData.unit} onValueChange={(value) => handleSelectChange('unit', value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ton">ton</SelectItem>
                        <SelectItem value="ekor">ekor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="fishingGear">Alat Tangkap</Label>
                  <Select value={formData.fishingGear} onValueChange={(value) => handleSelectChange('fishingGear', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih alat tangkap" />
                    </SelectTrigger>
                    <SelectContent>
                      {fishingGears.map((gear) => (
                        <SelectItem key={gear} value={gear}>{gear}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="button" 
                onClick={addCatchEntry}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={!formData.fishType || !formData.catchAmount}
              >
                <Fish className="w-4 h-4 mr-2" />
                Tambah ke Daftar
              </Button>

              {/* Catch Entries List */}
              {catchEntries.length > 0 && (
                <div className="space-y-2">
                  <Label>Daftar Hasil Tangkapan:</Label>
                  {catchEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{entry.fishType}</Badge>
                        <span className="text-sm text-slate-600">
                          {entry.amount} {entry.unit}
                        </span>
                        <span className="text-xs text-slate-500">• {entry.gear}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCatchEntry(entry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photos Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Foto Hasil Tangkapan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 mb-2">Drag & drop foto atau klik untuk upload</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Pilih Foto</span>
                  </Button>
                </label>
              </div>

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <ImageWithFallback
                        src={URL.createObjectURL(file)}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0"
                        onClick={() => {
                          const newImages = selectedImages.filter((_, i) => i !== index);
                          setSelectedImages(newImages);
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Catatan Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                name="notes"
                placeholder="Catatan mengenai kondisi cuaca, teknik penangkapan, atau informasi lainnya..."
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Weight className="w-5 h-5 text-slate-600" />
                Ringkasan Trip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-2xl text-slate-800">
                  {catchEntries.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0).toFixed(1)}
                </p>
                <p className="text-sm text-slate-600">Total Tangkapan (kg)</p>
              </div>
              
              <div className="text-center py-2">
                <p className="text-lg text-slate-700">{catchEntries.length}</p>
                <p className="text-sm text-slate-600">Jenis Ikan</p>
              </div>

              <div className="text-center py-2">
                <p className="text-lg text-slate-700">{selectedImages.length}</p>
                <p className="text-sm text-slate-600">Foto Terlampir</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Logbook</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="w-full justify-center bg-yellow-100 text-yellow-700 border-yellow-200 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Draft - Belum Dikirim
              </Badge>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => handleSubmit('save')}
              variant="outline" 
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              Simpan Draft
            </Button>
            
            <Button 
              onClick={() => handleSubmit('submit')}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              disabled={catchEntries.length === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Kirim ke DKP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}