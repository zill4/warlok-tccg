import React from "react";

interface AquaWindowProps {
  title?: string;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const AquaWindow: React.FC<AquaWindowProps> = ({
  title = "",
  toolbar,
  sidebar,
  children,
  footer,
  className = "",
}) => {
  const [isAVP, setIsAVP] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore - WebSpatial global check
    setIsAVP(typeof __XR_ENV_BASE__ !== 'undefined');
  }, []);
  return (
    <div 
      className={`__enableXr__ aqua-window ${className}`}
      style={isAVP ? {
        "--xr-background-material": "thin"
      } as React.CSSProperties : {}}
    >
      <div className="__enableXr__ aqua-titlebar">
        <div className="__enableXr__ traffic-lights">
          <span className="__enableXr__ traffic-light-red" />
          <span className="__enableXr__ traffic-light-yellow" />
          <span className="__enableXr__ traffic-light-green" />
        </div>
        {title && (
          <div 
            className="__enableXr__ aqua-title" 
            title={title}
          >
            {title}
          </div>
        )}
      </div>

      {toolbar && <div className="__enableXr__ aqua-toolbar">{toolbar}</div>}

      <div className={`__enableXr__ aqua-body ${sidebar ? "with-sidebar" : ""}`}>
        {sidebar && <aside className="__enableXr__ aqua-sidebar">{sidebar}</aside>}
        <section className="__enableXr__ aqua-content">{children}</section>
      </div>

      {footer && <div className="__enableXr__ aqua-footer">{footer}</div>}
    </div>
  );
};

export default AquaWindow;


