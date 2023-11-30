interface ButtonProps {
  label?: string;

  // Errore
  // Type '(e: React.MouseEvent<HTMLButtonElement>) => void' is not assignable to type '() => void'. Target signature provides too few arguments. Expected 1 or more, but got 0.ts(2322) Button.tsx(3, 3): The expected type comes from property 'onClick' which is declared here on type 'IntrinsicAttributes & ButtonProps'
  //onClick?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  secondary?: boolean;
}

const Button = ({ label, disabled, onClick, secondary }: ButtonProps) => {
  return (
    <button
      // un delirio questa cosa per la className
      className={`${
        secondary
          ? "bg-white border border-gray-300 text-gray-500"
          : "bg-indigo-600 hover:bg-indigo-800 text-white"
      } font-bold py-2 px-4 rounded-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
