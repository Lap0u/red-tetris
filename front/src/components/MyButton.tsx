type MyButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};

const MyButton = ({ onClick, text, disabled = false }: MyButtonProps) => {
  const bgColor = disabled ? 'bg-gray-300' : 'bg-red-500';
  const hoverBgColor = disabled ? 'hover:bg-gray-400' : 'hover:bg-red-600';
  return (
    <button
      onClick={onClick}
      className={`mt-4 px-4 py-2 rounded-md
        ${bgColor} text-white
        ${hoverBgColor} focus:outline-none
        focus:ring-2 focus:ring-red-500`}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default MyButton;
