
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Recovery email sent",
      description: "Check your inbox for the password reset link",
    });
  };

  return (
    <div className="bg-background border border-border rounded-lg p-8 shadow-sm">
      <Link to="/login" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to login
      </Link>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Forgot password?</h1>
        <p className="text-muted-foreground">
          {isSubmitted 
            ? "Check your email for the reset link"
            : "Enter your email below to receive a password reset link"
          }
        </p>
      </div>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-4">We've sent a recovery email to <strong>{email}</strong></p>
          <p className="text-sm text-muted-foreground mb-6">
            If you don't see it, check your spam folder or request a new link.
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Send again
          </Button>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
