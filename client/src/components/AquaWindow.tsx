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
  const isAVP = import.meta.env.XR_ENV === "avp";

  return (
    <div 
      enable-xr
      debugName="aqua-window"
      className={`aqua-window ${className}`}
      style={isAVP ? {
        "--xr-background-material": "thin"
      } as React.CSSProperties : {}}
    >
      <div
        enable-xr
        debugName="aqua-titlebar" 
        className="aqua-titlebar"
      >
        <div className="traffic-lights">
          <span className="traffic-light-red" />
          <span className="traffic-light-yellow" />
          <span className="traffic-light-green" />
        </div>
        {title && (
          <div 
            className="aqua-title" 
            title={title}
          >
            {title}
          </div>
        )}
      </div>

      {toolbar && (
        <div 
          enable-xr
          debugName="aqua-toolbar"
          className="aqua-toolbar"
        >
          {toolbar}
        </div>
      )}

      <div className={`aqua-body ${sidebar ? "with-sidebar" : ""}`}>
        {sidebar && (
          <aside 
            enable-xr
            debugName="aqua-sidebar"
            className="aqua-sidebar"
          >
            {sidebar}
          </aside>
        )}
        <section 
          enable-xr
          debugName="aqua-content"
          className="aqua-content"
        >
          {children}
        </section>
      </div>

      {footer && (
        <div 
          enable-xr
          debugName="aqua-footer"
          className="aqua-footer"
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default AquaWindow;
