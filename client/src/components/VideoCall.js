import { useRef, useState } from "react";

function VideoCall() {

    const videoRef = useRef(null);

    const recorderRef = useRef(null);

    const chunksRef = useRef([]);

    const [recording, setRecording] =
        useState(false);

    const screenShare = async () => {

        try {

            const stream =
                await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });

            videoRef.current.srcObject =
                stream;

        } catch {

            alert("Screen sharing cancelled");
        }
    };

    const startRecording = async () => {

        try {

            const stream =
                await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });

            videoRef.current.srcObject =
                stream;

            chunksRef.current = [];

            const recorder =
                new MediaRecorder(stream);

            recorderRef.current =
                recorder;

            recorder.ondataavailable =
                (e) => {

                    if (e.data.size > 0) {

                        chunksRef.current.push(
                            e.data
                        );
                    }
                };

            recorder.start();

            setRecording(true);

            alert(
                "Recording Started"
            );

        } catch {

            alert(
                "Recording Failed"
            );
        }
    };

    const stopRecording = () => {

        if (!recorderRef.current)
            return;

        recorderRef.current.stop();

        recorderRef.current.onstop =
            () => {

                const blob =
                    new Blob(
                        chunksRef.current,
                        {
                            type:
                                "video/webm"
                        }
                    );

                const url =
                    URL.createObjectURL(
                        blob
                    );

                const a =
                    document.createElement(
                        "a"
                    );

                a.href = url;

                a.download =
                    "recording.webm";

                a.click();

                setRecording(false);

                alert(
                    "Recording Downloaded"
                );
            };
    };

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h2>
                📹 Video Call
            </h2>

            <button
                onClick={screenShare}
            >
                Share Screen
            </button>

            <button
                onClick={
                    startRecording
                }
                style={{
                    marginLeft: "10px"
                }}
            >
                Start Recording
            </button>

            <button
                onClick={
                    stopRecording
                }
                disabled={!recording}
                style={{
                    marginLeft: "10px"
                }}
            >
                Stop Recording
            </button>

            <br />
            <br />

            <video
                ref={videoRef}
                autoPlay
                controls
                width="700"
                style={{
                    border:
                        "1px solid gray"
                }}
            />

        </div>
    );
}

export default VideoCall;