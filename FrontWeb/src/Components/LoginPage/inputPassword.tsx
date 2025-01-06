interface TextComponentProps {
  text: string;
  setVar: (text: string) => void;
}

const inputPassword: React.FC<TextComponentProps> = (TextComponentProps) => {
  return (
    <div className="form-control w-full max-w-xl mt-6">
      <label className="label">
        <span
          style={{ fontFamily: "merriweather" }}
          className="label-text text-black text-lg"
        >
          {" "}
          {TextComponentProps.text}{" "}
        </span>
      </label>
      <input
        type="password"
        className="input border-0 border-b-2 rounded-none border-gray-400 bg-transparent focus:outline-none focus:text-black"
        onChange={(text) => TextComponentProps.setVar(text.target.value)}
      />
    </div>
  );
};

export default inputPassword;
