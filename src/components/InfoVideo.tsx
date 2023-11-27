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
    <>
      <h4 style={{ padding: 8 }}>Info</h4>
      <ul>
        <li>
          Aspect Ratio <b>{stampAspectRatio}</b>
        </li>
        <li>
          Larghezza in px: <b>{videoFormat.width}</b>
        </li>
        <li>
          Altezza in px: <b>{videoFormat.height}</b>
        </li>
      </ul>
    </>
  );
};
export default InfoVideo;
