import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download } from 'lucide-react';
import { useProductsCRUD } from '@/hooks/useProductsCRUD';

interface BulkProductImportProps {
  onImportComplete: () => void;
}

const BulkProductImport = ({ onImportComplete }: BulkProductImportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);
  const { createProduct } = useProductsCRUD();
  const { toast } = useToast();

  const sampleCSV = `name,description,price,stock,category,sku,image_url
"Retro Sneakers","Classic vintage style sneakers",89.99,25,"Footwear","RS001","https://example.com/sneakers.jpg"
"Casual Jacket","Lightweight casual jacket for everyday wear",129.99,15,"Outerwear","CJ002","https://example.com/jacket.jpg"
"Running Pants","Comfortable athletic pants for running",59.99,30,"Sportswear","RP003","https://example.com/pants.jpg"`;

  const parseCSV = (csv: string) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    const products = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim()); // Add the last value
      
      if (values.length === headers.length) {
        const product: any = {};
        headers.forEach((header, index) => {
          let value = values[index];
          
          if (header === 'price') {
            product[header] = parseFloat(value) || 0;
          } else if (header === 'stock') {
            product[header] = parseInt(value) || 0;
          } else {
            product[header] = value || undefined;
          }
        });
        products.push(product);
      }
    }
    
    return products;
  };

  const handleImport = async () => {
    if (!csvData.trim()) {
      toast({
        title: "Error",
        description: "Please enter CSV data to import",
        variant: "destructive",
      });
      return;
    }

    try {
      setImporting(true);
      const products = parseCSV(csvData);
      
      if (products.length === 0) {
        throw new Error('No valid products found in CSV data');
      }

      let successCount = 0;
      let failureCount = 0;

      for (const product of products) {
        try {
          await createProduct(product);
          successCount++;
        } catch (error) {
          failureCount++;
          console.error(`Failed to import product: ${product.name}`, error);
        }
      }

      toast({
        title: "Import Complete",
        description: `Successfully imported ${successCount} products. ${failureCount} failed.`,
      });

      if (successCount > 0) {
        onImportComplete();
        setIsOpen(false);
        setCsvData('');
      }

    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : 'Failed to parse CSV data',
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadSample = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-products.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Import Products</DialogTitle>
          <DialogDescription>
            Import multiple products using CSV format. Download the sample file to see the required format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={downloadSample}>
              <Download className="h-4 w-4 mr-2" />
              Download Sample CSV
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="csv-data">CSV Data</Label>
            <Textarea
              id="csv-data"
              placeholder="Paste your CSV data here..."
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Required columns:</strong> name, price, category</p>
            <p><strong>Optional columns:</strong> description, stock, sku, image_url</p>
            <p><strong>Note:</strong> Use quotes around values that contain commas</p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={importing}>
              {importing ? 'Importing...' : 'Import Products'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkProductImport;
