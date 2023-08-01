import { ReactNode } from "react";
import "./button.css";
//custom reusbale button, accepts children as a name to be displayed,type will be a classname to be used in a stylesheet. If there is a onClick function that will be passed and also a disabled property,
interface ButtonProps {
  children: ReactNode;
  type: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
const Button = ({ children, type, onClick, disabled }: ButtonProps) => {
  // if there is onClick function
  if (onClick) {
    return (
      <button className={`${type}`} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  // if there is no onClick function on the button.
  return (
    <button className={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
