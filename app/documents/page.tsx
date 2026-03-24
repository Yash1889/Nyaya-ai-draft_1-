'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  documentTemplates,
  getTemplateById,
  generateDocument,
  DocumentData,
} from '@/lib/document-templates';
import { Download, Eye, EyeOff } from 'lucide-react';

export default function DocumentsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState<DocumentData>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const template = selectedTemplate ? getTemplateById(selectedTemplate) : null;

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    setPreview(null);
  };

  const handleGeneratePreview = () => {
    if (!template) return;

    const isComplete = template.fields.every((field) => {
      if (field.required && !formData[field.id]) {
        return false;
      }
      return true;
    });

    if (!isComplete) {
      alert('Please fill in all required fields');
      return;
    }

    const generatedDocument = generateDocument(template, formData);
    setPreview(generatedDocument);
    setShowPreview(true);
  };

  const handleDownload = () => {
    if (!preview) return;

    const element = document.createElement('a');
    const file = new Blob([preview], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template?.id || 'document'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create legal documents with guided forms
          </p>
        </div>

        {!selectedTemplate ? (
          /* Template Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTemplates.map((tmpl) => (
              <Card
                key={tmpl.id}
                className="p-6 bg-card border-border hover:border-accent/50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedTemplate(tmpl.id);
                  setFormData({});
                  setPreview(null);
                }}
              >
                <h3 className="font-semibold text-foreground mb-2">{tmpl.name}</h3>
                <p className="text-sm text-muted-foreground">{tmpl.description}</p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-accent border-accent hover:bg-accent/10"
                  >
                    Create Document
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Form View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <Card className="lg:col-span-1 p-6 bg-card border-border h-fit">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">{template?.name}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(null);
                    setFormData({});
                    setPreview(null);
                  }}
                  className="text-xs"
                >
                  Change Template
                </Button>
              </div>

              <div className="space-y-4">
                {template?.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-input border-border"
                      />
                    )}
                  </div>
                ))}

                <Button
                  onClick={handleGeneratePreview}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                >
                  Generate Preview
                </Button>
              </div>
            </Card>

            {/* Preview Section */}
            <Card className="lg:col-span-2 p-6 bg-card border-border">
              {preview ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-foreground">Document Preview</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="gap-2"
                      >
                        {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                        {showPreview ? 'Hide' : 'Show'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleDownload}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                    </div>
                  </div>

                  {showPreview && (
                    <div className="bg-muted rounded-lg p-6 border border-border max-h-96 overflow-y-auto">
                      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                        {preview}
                      </pre>
                    </div>
                  )}

                  {!showPreview && (
                    <div className="bg-muted rounded-lg p-6 border border-border h-80 flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        Preview hidden. Click "Show" to view the document.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> This is a generated document. Please review it carefully
                      and make any necessary edits before using it. For important legal documents,
                      consult with a qualified lawyer.
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center">
                  <div className="text-muted-foreground">
                    <p className="font-medium mb-2">No preview yet</p>
                    <p className="text-sm">Fill in the form and click "Generate Preview" to see your document</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
