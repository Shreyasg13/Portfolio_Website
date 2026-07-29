export const Glass = ({ hue = 'ai', className = '', children, ...p }) => (
  <div className={`glass glass--${hue} ${className}`} {...p}>{children}</div>
);
export default Glass;
