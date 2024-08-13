'use client';
import React, { ErrorInfo, useEffect, useState } from 'react';
import { ErrorBoundaryState } from '../types';
import { render } from 'react-dom';

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error.message);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1 className="error-title">Something went wrong</h1>
          <button
            className="return-button"
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// const ErrorBoundary: React.FC<React.PropsWithChildren> = ({ children }) => {
//   const [hasError, setHasError] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     setHasError(false);
//     setError(null);
//   }, [children]);

//   const handleError = (err: Error) => {
//     setHasError(true);
//     setError(err);
//   };

//   if (hasError) {
//     handleError(error!);
//     return (
//       <div className="error-container">
//         <h1 className="error-title">Something went wrong</h1>
//         <button
//           className="return-button"
//           type="button"
//           onClick={() => setHasError(false)}
//         >
//           Try again
//         </button>
//       </div>
//     );
//   }
//   return <>{children}</>;
// };

// export default ErrorBoundary;
