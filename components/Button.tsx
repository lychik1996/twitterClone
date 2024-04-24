interface ButtonPros {
  label: string;
  secondary?: boolean;
  fullWith?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

export default function Button({
  label,
  secondary,
  fullWith,
  onClick,
  disabled,
  large,
  outline,
}: ButtonPros) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={
        `disabled:opacity-70 
        disabled:cursor-not-allowed
        rounded-full font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWith ? 'w-full': 'w-fit'}
        ${secondary? 'bg-white text-black border-black': 'bg-sky-500 text-white border-sky-500'}
        ${large? 'text-xl px-5 py-3 ': 'text-md px-4 py-2'}
        ${outline? 'bg-transparent border-white text-white':''}
        
        `
      }
     >
        {label}
      </button>
    </>
  );
}
