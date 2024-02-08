type MyButtonProps = {
  onClick: () => void;
  text: string;
};

const MyButton = ({ onClick, text }: MyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
      {text}
    </button>
  );
};

export default MyButton;
