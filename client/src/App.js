import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Premium from "./pages/Premium";
import OtpLogin from "./pages/OtpLogin";

import VideoPlayer from "./components/VideoPlayer";
import VideoCall from "./components/VideoCall";
import ThemeWrapper from "./components/ThemeWrapper";
import NotificationBell from "./components/NotificationBell";
import Dashboard from "./components/Dashboard";
import AboutProject from "./components/AboutProject";

function App() {

    return (

        <ThemeWrapper>

            <NotificationBell />

            <div
                style={{
                    fontFamily: "Arial",
                    minHeight: "100vh",
                    paddingBottom: "50px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        padding: "20px"
                    }}
                >
                    🎓 Internship Project
                </h1>

                <Dashboard />

                <hr />

                <Home />

                <hr />

                <Downloads />

                <hr />

                <Premium />

                <hr />

                <VideoPlayer />

                <hr />

                <OtpLogin />

                <hr />

                <VideoCall />

                <hr />

                <AboutProject />

            </div>

        </ThemeWrapper>
    );
}

export default App;