import React from 'react';

interface LoaderProps {
  type?: 'spinner' | 'dots' | 'pulse';
  size?: 'small' | 'medium' | 'large';
  inline?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  type = 'spinner',
  size = 'medium',
  inline = false
}) => {
  const getLoaderClass = () => {
    let className = 'loader ';

    if (size === 'small') className += 'small ';
    if (inline) className += 'inline ';

    className += `loader-${type}`;

    return className;
  };

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={getLoaderClass()}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      case 'pulse':
        return <div className={getLoaderClass()}></div>;
      case 'spinner':
      default:
        return <div className={getLoaderClass()}></div>;
    }
  };

  if (inline) {
    return renderLoader();
  }

  return (
    <div className="loader-container">
      {renderLoader()}
    </div>
  );
};

export default Loader;