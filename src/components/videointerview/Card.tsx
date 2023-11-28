// interface CardProps {
//   children: React.ReactNode | React.ReactNode[];

import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

// }
const questionDemo =
  "Alcuni colleghi si sono dimessi nello stesso periodo. Come tuo capo, ti chiedo di lavorare per tre sabati consecutivi, in straordinario, per metterci in pari con il lavoro. Parlando con gli altri tuoi colleghi, noti un certo malumore a riguardo. Convincimi a non lavorare di sabato.";

const Card = () => {
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

  const videoSizeWidth = 150;
  const videoSizeHeight = 150;

  const videoConstraints = {
    aspectRatio: videoSizeWidth / videoSizeHeight,

    // Predene la camera frontale
    facingMode: "user",

    // Da testare
    mirrored: "false",

    // Da testare
    screenshotQuality: 0.92,

    // Non ci serve ora
    audio: false,

    // Larghezza e altezza per il formato variabile
    width: { min: videoSizeWidth },
    height: { min: videoSizeHeight },
  };

  // Imposto un formato di base
  const [videoFormat] = useState({
    width: 720,
    height: 480,
  });

  // Attivo le cose "react-media-recorder" e inserisco i formati che desidero per la registrazione
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: {
        width: videoFormat.width,
        height: videoFormat.height,
      },
    });

  // Imposto lo status per disattivare i pulsanti per quando sono in fase di registrazione ecc
  const [recordingStatus, setRecordingStatus] = useState(status);

  // Avvia la registrazione
  const handleStartRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startRecording();
    setRecordingStatus("recording");
    console.log("recording");
  };

  // Stoppa la registrazione
  const handleStopRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    stopRecording();
    setRecordingStatus("stopped");
    console.log("stopped");
  };

  // Crea un link e scarica il file video registrato
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = mediaBlobUrl ?? "";
    a.download = "proto-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("download");
  };
  return (
    <section id="card" className="bg-white p-6 flex flex-col gap-4">
      <section className="text-center">
        <h3 className="text-xl font-bold">Domanda 1 di 3</h3>
      </section>
      <section
        style={{
          backgroundColor: "#FFF0E6",
        }}
        className="p-3 rounded-lg w-[786px] h-[316px]"
      >
        <h3 className="text-xl font-semibold">{questionDemo}</h3>
      </section>
      <section id="webcam_area">
        <div id="webcam_center">
          <Webcam
            id="webcam_circle"
            style={{ width: `${videoSizeWidth}`, height: `${videoSizeHeight}` }}
            width={videoSizeWidth}
            height={videoSizeHeight}
            videoConstraints={videoConstraints}
            mirrored={false}
            audio={false}
          />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center">
        <div id="status" className="p-4">
          {recordingStatus === "recording" && (
            <p className="text-red-600">Registrazione in corso...</p>
          )}
        </div>
        <div id="actionButton" className="flex flex-row gap-3">
          <button
            className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
            onClick={handleStartRecording}
            disabled={recordingStatus === "recording"}
          >
            Registra
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
            onClick={handleStopRecording}
            disabled={recordingStatus !== "recording"}
          >
            Ferma registrazione
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
            onClick={handleDownload}
            disabled={!mediaBlobUrl}
          >
            Download
          </button>
        </div>
      </section>
    </section>
  );
};

export default Card;