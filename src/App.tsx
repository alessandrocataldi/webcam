import { useState } from "react";
// https://www.npmjs.com/package/react-media-recorder
import { useReactMediaRecorder } from "react-media-recorder";

// https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";
import "./App.css";
import { sizeVideo } from "./VideoData";
import ButtonGroup from "./components/ButtonGroup";
import InfoVideo from "./components/InfoVideo";

function App() {
  // Imposto un formato di base
  const [videoFromat, setVideoFormat] = useState({
    width: 720,
    height: 480,
    label: "16:9 (attuale)",
  });

  // Attivo le cose "react-media-recorder" e inserisco i formati che desidero per la registrazione
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: {
        width: videoFromat.width,
        height: videoFromat.height,
      },
    });

  // Imposto lo status per disattivare i pulsanti per quando sono in fase di registrazione ecc
  const [recordingStatus, setRecordingStatus] = useState(status);

  // Cambia il formato, vedi array sizeVideo
  const handleFormatChange = (format: number | string) => {
    // Cerca il formato corrispondente nell'array sizeVideo
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const selectedFormat = sizeVideo.find((value) => value.id === format);

    // Se il formato è stato trovato, aggiorna lo stato videoFormat
    if (selectedFormat) {
      setVideoFormat({
        width: selectedFormat.width,
        height: selectedFormat.height,
        label: selectedFormat.label,
      });
    }
  };

  // Avvia la registrazione
  const handleStartRecording = () => {
    startRecording();
    setRecordingStatus("recording");
  };

  // Stoppa la registrazione
  const handleStopRecording = () => {
    stopRecording();
    setRecordingStatus("stopped");
  };

  // Crea un link e scarica il file video registrato
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = mediaBlobUrl ?? "";
    a.download = "proto-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Formato variabile
  const videoConstraints = {
    // Esempio: 480/720 = 0.6666666667
    aspectRatio: videoFromat.width / videoFromat.height,

    // Predene la camera frontale
    facingMode: "user",

    // Da testare
    mirrored: "false",

    // Da testare
    screenshotQuality: 0.92,

    // Non ci serve ora
    audio: false,

    // Larghezza e altezza per il formato variabile
    width: { min: videoFromat.width },
    height: { min: videoFromat.height },
  };

  // Il componente Webcam e le proprieta in videoConstraints in html e css genera un elemento HTML video:
  // Camera attuale che formato ha in HTML?
  /*
  video[Attributes Style] {
    width: 480px;
    aspect-ratio: auto 480 / 720;
    height: 720px;
  }
  video {
    object-fit: contain;
    overflow-clip-margin: content-box;
    overflow: clip;
  }
*/
  // Can I use ... ?
  // aspect-ratio: https://caniuse.com/?search=aspect-ratio
  // object-fit: https://caniuse.com/?search=object-fit
  // overflow-clip-margin: https://caniuse.com/?search=overflow-clip-margin
  // overflow: https://caniuse.com/?search=overflow

  // Aggiorna il componente forzano gli elementi widht e height
  const webcamKey = `${videoFromat.width}-${videoFromat.height}`;

  return (
    <div className="App">
      <aside className="sidebar">
        <InfoVideo videoFormat={videoFromat} />
      </aside>
      <main id="video-area">
        {videoFromat && (
          <>
            <Webcam
              key={webcamKey}
              id="webcam"
              width={videoFromat.width}
              height={videoFromat.height}
              videoConstraints={videoConstraints}
              mirrored={false}
              audio={false}
              screenshotFormat="image/webp"
            />
            <div className="row">
              <button
                onClick={handleStartRecording}
                disabled={recordingStatus === "recording"}
              >
                Registra
              </button>
              <button
                onClick={handleStopRecording}
                disabled={recordingStatus !== "recording"}
              >
                Ferma
              </button>
              <button onClick={handleDownload} disabled={!mediaBlobUrl}>
                Download
              </button>
            </div>
          </>
        )}
      </main>
      <aside className="aside">
        <h4>Cambia il formato video da qui:</h4>
        <ButtonGroup handleFormatChange={handleFormatChange} />
      </aside>
    </div>
  );
}

export default App;
