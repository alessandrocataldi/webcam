interface InfoVideoProps {
  videoFormat: {
    label: string;
    width: number;
    height: number;
  };
}

const InfoVideo = ({ videoFormat }: InfoVideoProps) => {
  // Calcolo aspect ratio
  const stampAspectRatio = videoFormat.width / videoFormat.height;

  return (
    <ul>
      <li>
        <h3>{videoFormat.label}</h3>
      </li>
      <li>Aspect Ratio</li>
      <li>
        <b>{stampAspectRatio}</b>
      </li>
      <li>Larghezza in px:</li>
      <li>
        <b>{videoFormat.width}</b>
      </li>
      <li>Altezza in px:</li>
      <li>
        <b>{videoFormat.height}</b>
      </li>
    </ul>
  );
};
export default InfoVideo;
