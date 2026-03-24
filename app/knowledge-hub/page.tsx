'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  categories,
  articles,
  getArticlesByCategory,
  getArticleById,
  Article,
} from '@/lib/knowledge-articles';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function KnowledgeHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  
  // Ensure articles is available
  if (!articles || articles.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground">No Articles Available</h1>
        </div>
      </MainLayout>
    );
  }

  const article = selectedArticle ? getArticleById(selectedArticle) : null;
  const categoryArticles = selectedCategory ? getArticlesByCategory(selectedCategory) : [];

  if (selectedArticle && article) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedArticle(null)}
            className="mb-6 gap-2 text-accent hover:bg-accent/10"
          >
            <ArrowLeft size={18} />
            Back to {article.category}
          </Button>

          {/* Article */}
          <Card className="p-8 bg-card border-border">
            <div className="mb-6">
              <p className="text-accent font-medium text-sm mb-2">{article.category}</p>
              <h1 className="text-3xl font-bold text-foreground mb-2">{article.title}</h1>
              <p className="text-muted-foreground">{article.summary}</p>
            </div>

            <div className="border-t border-border pt-8">
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>

            <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Disclaimer:</strong> This information is for educational purposes only and does
                not constitute legal advice. Please consult with a qualified lawyer for advice specific
                to your situation.
              </p>
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (selectedCategory) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory(null)}
            className="gap-2 text-accent hover:bg-accent/10"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Button>

          {/* Category Title */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{selectedCategory}</h1>
            <p className="text-muted-foreground mt-2">
              Explore articles and guides for {selectedCategory.toLowerCase()}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryArticles.map((article) => (
              <Card
                key={article.id}
                className="p-6 bg-card border-border hover:border-accent/50 cursor-pointer transition-colors"
                onClick={() => setSelectedArticle(article.id)}
              >
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {article.summary}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-accent hover:bg-accent/10 p-0"
                >
                  Read More <ChevronRight size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Hub</h1>
          <p className="text-muted-foreground mt-2">
            Learn about your legal rights and responsibilities
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryArticles = getArticlesByCategory(category);
            return (
              <Card
                key={category}
                className="p-6 bg-card border-border hover:border-accent/50 cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {category}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ChevronRight size={24} className="text-accent" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 4).map((article) => (
              <Card
                key={article.id}
                className="p-6 bg-card border-border hover:border-accent/50 cursor-pointer transition-colors"
                onClick={() => setSelectedArticle(article.id)}
              >
                <p className="text-xs font-medium text-accent mb-2 uppercase">
                  {article.category}
                </p>
                <h3 className="font-semibold text-foreground mb-3">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.summary}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-accent hover:bg-accent/10 p-0"
                >
                  Read More <ChevronRight size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
