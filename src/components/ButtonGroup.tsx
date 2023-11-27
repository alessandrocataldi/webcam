interface ButtonGroupProps {
  handleFormatChange: (value: string) => void;
}

const ButtonGroup = ({ handleFormatChange }: ButtonGroupProps) => {
  const formats = [
    { label: "16:9 (Attuale)", value: "16:9" },
    { label: "9:16 (Proposta 1)", value: "9:16" },
    { label: "9:16 (Proposta 1.1 mini)", value: "9:16 mini" },
    { label: "9:16 (Proposta 1.2 super mini)", value: "9:16 super mini" },
    { label: "4:3 (Proposta 2)", value: "4:3" },
    { label: "4:3 Mini (Proposta 3)", value: "4:3 mini" },
    { label: "1:1 (stress test)", value: "1:1" },
  ];
  return (
    <div style={{ padding: 8 }}>
      {formats.map((format, index) => (
        <button
          style={{ marginBottom: 8 }}
          key={index}
          className="btn-secondary"
          onClick={() => handleFormatChange(format.value)}
        >
          {format.label}
        </button>
      ))}
    </div>
  );
};
export default ButtonGroup;
