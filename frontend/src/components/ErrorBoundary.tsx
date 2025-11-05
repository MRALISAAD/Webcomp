import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircleIcon, HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry)
    console.error("Error caught by boundary:", error, errorInfo);
    
    // In production, send to error tracking service
    if (import.meta.env.PROD) {
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] items-center justify-center p-4">
          <div className="max-w-md w-full space-y-4">
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Oops! Something went wrong</AlertTitle>
              <AlertDescription>
                We apologize for the inconvenience. An unexpected error occurred.
                {this.state.error && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      Technical details
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto bg-black/5 p-2 rounded">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button onClick={this.handleReset} variant="outline" className="w-full">
                Try Again
              </Button>
              <Button asChild variant="default" className="w-full">
                <a href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

