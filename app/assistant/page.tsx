'use client';

import { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getScenarioResponse, getDefaultResponse } from '@/lib/legal-scenarios';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  isStructured?: boolean;
  problem?: string;
  steps?: string[];
  actions?: string[];
  laws?: string[];
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'assistant',
      content: getDefaultResponse(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get response based on scenario matching
    const scenario = getScenarioResponse(input);

    if (scenario) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        isStructured: true,
        problem: scenario.problem,
        steps: scenario.suggestedSteps,
        actions: scenario.legalActions,
        laws: scenario.relevantLaws,
        content: scenario.title,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking about: "${input}"\n\nWhile I can provide guidance on general legal matters, this specific query might require specialized assistance. Please describe your issue in more detail, or contact a legal professional for case-specific advice.\n\nRemember: This is general legal information, not legal advice. Always consult with a qualified lawyer for your specific situation.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }

    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
        {/* Header with Anonymous Toggle */}
        <div className="mb-6 flex items-start justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Legal Assistant</h1>
            <p className="text-muted-foreground mt-2">
              Get instant guidance on common legal issues
            </p>
          </div>
          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0 ${
              isAnonymous
                ? 'bg-accent text-primary'
                : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
            }`}
          >
            <Eye size={18} />
            {isAnonymous ? 'Anonymous Mode ON' : 'Ask Anonymously'}
          </button>
        </div>

        {/* Anonymous Mode Disclaimer */}
        {isAnonymous && (
          <Card className="mb-6 p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-900">Anonymous Mode Active</Badge>
              <p className="text-sm text-blue-900">This is a private, anonymous session. No data is stored.</p>
            </div>
          </Card>
        )}

        {/* Chat Container */}
        <Card className="flex-1 bg-card border-border flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'user' ? (
                  <div className="max-w-lg bg-primary text-primary-foreground rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                ) : message.isStructured ? (
                  <div className="max-w-2xl space-y-4 w-full">
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <h3 className="font-semibold text-accent mb-2">{message.content}</h3>
                    </div>

                    {message.problem && (
                      <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                          <AlertCircle size={18} />
                          Understanding the Issue
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {message.problem}
                        </p>
                      </div>
                    )}

                    {message.steps && message.steps.length > 0 && (
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-3">
                          Suggested Steps to Take
                        </h4>
                        <ol className="space-y-2">
                          {message.steps.map((step, index) => (
                            <li key={index} className="text-sm text-foreground flex gap-3">
                              <span className="font-semibold flex-shrink-0">
                                {index + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {message.actions && message.actions.length > 0 && (
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                          <CheckCircle size={18} />
                          Legal Actions Available
                        </h4>
                        <ul className="space-y-2">
                          {message.actions.map((action, index) => (
                            <li
                              key={index}
                              className="text-sm text-green-800 dark:text-green-100 flex gap-2"
                            >
                              <span className="text-accent font-bold">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {message.laws && message.laws.length > 0 && (
                      <div className="bg-muted rounded-lg p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-3">
                          Relevant Laws
                        </h4>
                        <ul className="space-y-2">
                          {message.laws.map((law, index) => (
                            <li key={index} className="text-sm text-foreground">
                              <span className="font-medium text-accent">•</span> {law}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-2xl bg-muted rounded-lg p-4">
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-muted-foreground/30 rounded w-32"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legal issue..."
                disabled={isLoading}
                className="flex-1 bg-input border-border"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
              >
                <Send size={20} />
                <span className="hidden sm:inline ml-2">Send</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              This is general legal information, not legal advice. Always consult with a qualified
              lawyer for your specific situation.
            </p>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
