import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-96 bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
          <div className="text-center max-w-lg">
            <h1 className="text-5xl font-bold text-red-600 mb-4">⚠️ Error</h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Page Error!
            </p>
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-3 mb-6 text-left max-h-32 overflow-y-auto">
              <p className="text-red-800 font-mono text-xs break-words">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              The page you're trying to access encountered an error. Please try again or go back to login.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => window.location.href = "/"}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md text-sm"
              >
                🏠 Go to Login
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition font-semibold shadow-md text-sm"
              >
                ⬅️ Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
