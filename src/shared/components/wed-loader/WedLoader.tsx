import "./wed-loader.scss";

interface Props {
  color?: string;
  size?: string;
  width?: string;
}

function WedLoader({ color = "#fff", size = "25px", width = "3px" }: Props) {
  const styles = {
    borderTop: `${width} solid ${color}`,
    borderRight: `${width} solid transparent`,
    width: size,
    height: size,
  };
  return (
    <>
      <div className="spinner" style={styles}></div>
    </>
  );
}

export default WedLoader;
