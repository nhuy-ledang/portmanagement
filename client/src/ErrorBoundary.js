import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị UI fallback khi có lỗi xảy ra
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ghi log lỗi hoặc thực hiện các xử lý bổ sung
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Hiển thị UI fallback khi có lỗi xảy ra
      return <h1>Something went wrong.</h1>;
    }

    // Nếu không có lỗi, render component con bên trong ErrorBoundary
    return this.props.children;
  }
}

export default ErrorBoundary;