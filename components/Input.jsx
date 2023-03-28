import clsx from "clsx";

const Input = ({ className, placeholder, ...props }) => {
  return (
    <div className="w-full">
      <label className="text-lg text-violet-600 font-bold px-2" htmlFor={placeholder}>{placeholder} </label>
      <input
        className={clsx(
          "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
          className
        )}
        placeholder={placeholder}
        id={placeholder}
        {...props}
      />
    </div>

  );
};

export default Input;