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
  return (
    <div className={`aqua-window ${className}`}>
      <div className="aqua-titlebar">
        <div className="traffic-lights">
          <span className="traffic-light red" />
          <span className="traffic-light yellow" />
          <span className="traffic-light green" />
        </div>
        {title && (
          <div className="aqua-title" title={title}>
            {title}
          </div>
        )}
      </div>

      {toolbar && <div className="aqua-toolbar">{toolbar}</div>}

      <div className={`aqua-body ${sidebar ? "with-sidebar" : ""}`}>
        {sidebar && <aside className="aqua-sidebar">{sidebar}</aside>}
        <section className="aqua-content">{children}</section>
      </div>

      {footer && <div className="aqua-footer">{footer}</div>}
    </div>
  );
};

export default AquaWindow;


