import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { LabelUploader } from '@/components/labels/LabelUploader';

const LabelsUploadPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Labels</h1>
          <p className="text-muted-foreground">
            Upload your PDF label files for AI-powered processing and organization
          </p>
        </div>
        
        <LabelUploader />
      </div>
    </Layout>
  );
};

export default LabelsUploadPage;