import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  labelCount?: number;
}

export const LabelUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const pdfFiles = fileList.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== fileList.length) {
      toast({
        title: "Invalid Files",
        description: "Please upload only PDF files.",
        variant: "destructive",
      });
    }

    const newFiles: UploadedFile[] = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (progress >= 100) {
            clearInterval(interval);
            // Start processing simulation
            setTimeout(() => simulateProcessing(fileId), 500);
            return { ...file, progress: 100, status: 'processing' };
          }
          return { ...file, progress: Math.min(progress, 99) };
        }
        return file;
      }));
    }, 200);
  };

  const simulateProcessing = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (progress >= 100) {
            clearInterval(interval);
            const labelCount = Math.floor(Math.random() * 20) + 5;
            toast({
              title: "Processing Complete",
              description: `Successfully processed ${labelCount} labels from ${file.name}`,
            });
            return { 
              ...file, 
              progress: 100, 
              status: 'completed',
              labelCount 
            };
          }
          return { ...file, progress: Math.min(progress, 99) };
        }
        return file;
      }));
    }, 300);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-danger" />;
    }
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'bg-primary';
      case 'processing':
        return 'bg-warning';
      case 'completed':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Label Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver 
                ? 'dropzone-active' 
                : 'dropzone-default'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Drop PDF files here</h3>
                <p className="text-muted-foreground">
                  or <span className="text-primary font-medium">click to browse</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Supports: PDF files up to 10MB each
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Upload Queue</span>
              <Badge variant="secondary">
                {files.length} file{files.length !== 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
              >
                <FileText className="h-8 w-8 text-danger flex-shrink-0" />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{file.name}</h4>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(file.status)}
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {file.status === 'uploading' ? 'Uploading...' :
                         file.status === 'processing' ? 'Processing...' :
                         file.status === 'completed' ? `${file.labelCount} labels extracted` :
                         'Error occurred'}
                      </span>
                      <span>{Math.round(file.progress)}%</span>
                    </div>
                    <Progress 
                      value={file.progress} 
                      className={`h-1.5 ${getStatusColor(file.status)}`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {file.status === 'completed' && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};