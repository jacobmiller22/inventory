interface SpacerProps {
  style?: any;
}

const Spacer = ({ style }: SpacerProps) => {
  return <div style={{ flexGrow: 1, ...style }} />;
};

export default Spacer;
