import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import Alert from "../Alert";
import Button from "../Button";
import Counter from "../Counter";
import ClockIcon from "../icons/ClockIcon";
import WifiBadIcon from "../icons/WifiBadIcon";
import WifiGoodIcon from "../icons/WifiGoodIcon";

const questionDemo =
  "Alcuni colleghi si sono dimessi nello stesso periodo. Come tuo capo, ti chiedo di lavorare per tre sabati consecutivi, in straordinario, per metterci in pari con il lavoro. Parlando con gli altri tuoi colleghi, noti un certo malumore a riguardo. Convincimi a non lavorare di sabato.";

const Card = () => {
  // Extra: alert status wifi
  const [wifiBad, setWifiBad] = useState(false);

  // Extra: countdown
  const [startCountdown, setStartCountdon] = useState(false);

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

  // Avvia la registrazione
  const handleStartRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startRecording();
    setRecordingStatus("recording");
    console.log("recording");
    setStartCountdon(true);
  };

  // Stoppa la registrazione
  const handleStopRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    stopRecording();
    setRecordingStatus("stopped");
    console.log("stopped");
    setStartCountdon(false);
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

  // Extra: finto check della rete wifi, mostro solo il banner in realtà
  const handleViewAlert = () => {
    setWifiBad(true);
    console.log("Wifi click ");
  };

  const handleHiddenAlert = () => {
    setWifiBad(false);
  };

  return (
    <section id="card" className="bg-white p-6 flex flex-col gap-4">
      {wifiBad && <Alert />}
      <section className="flex flex-row justify-between">
        <h3 className="text-xl font-bold">Domanda 1 di 3</h3>
        <div
          id="status-videointerview"
          className="flex flex-row gap-2 items-center"
        >
          <div id="wifiStatus">
            <button onClick={handleViewAlert}>
              {wifiBad && <WifiBadIcon />}
            </button>
            <button onClick={handleHiddenAlert}>
              {!wifiBad && <WifiGoodIcon />}
            </button>
          </div>
          <div
            id="timer"
            className="flex flex-row items-center gap-2 text-xl font-semibold"
          >
            <ClockIcon />{" "}
            <span>
              {!startCountdown && <>3:00</>}
              {startCountdown && <Counter />}
            </span>
          </div>
        </div>
      </section>
      <section
        id="question"
        style={{
          backgroundColor: "#FFF0E6",
        }}
        className="p-3 rounded-lg w-[786px] h-[316px]"
      >
        <h3 className="font-semibold">{questionDemo}</h3>
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
        <div id="actionButton" className="flex gap-3 flex-row">
          <Button
            label="Registra"
            onClick={handleStartRecording}
            disabled={recordingStatus === "recording"}
          />
          <Button
            label="Stop"
            onClick={handleStopRecording}
            disabled={recordingStatus !== "recording"}
          />
          <Button
            label="Download"
            onClick={handleDownload}
            disabled={!mediaBlobUrl}
            secondary={true}
          />
        </div>
      </section>
    </section>
  );
};

export default Card;
