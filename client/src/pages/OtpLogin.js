import { useState } from "react";
import API from "../services/api";

function OtpLogin() {

    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    const sendOtp = async () => {

        try {

            const res = await API.post(
                "/otp/send",
                {
                    email,
                    state,
                    mobile
                }
            );

            alert(res.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to send OTP"
            );
        }
    };

    const verifyOtp = async () => {

        try {

            const res = await API.post(
                "/otp/verify",
                {
                    email,
                    otp
                }
            );

            alert(res.data.message);

        } catch {

            alert("Invalid OTP");
        }
    };

    return (

        <div
            style={{
                padding: 20,
                border: "1px solid #ccc",
                margin: 20,
                borderRadius: 10
            }}
        >

            <h2>🔐 OTP Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                style={{
                    width: "300px",
                    padding: "8px"
                }}
            />

            <br />
            <br />

            <input
                placeholder="State"
                value={state}
                onChange={(e) =>
                    setState(e.target.value)
                }
                style={{
                    width: "300px",
                    padding: "8px"
                }}
            />

            <br />
            <br />

            <input
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) =>
                    setMobile(e.target.value)
                }
                style={{
                    width: "300px",
                    padding: "8px"
                }}
            />

            <br />
            <br />

            <button onClick={sendOtp}>
                Send OTP
            </button>

            <br />
            <br />

            <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                    setOtp(e.target.value)
                }
                style={{
                    width: "300px",
                    padding: "8px"
                }}
            />

            <br />
            <br />

            <button onClick={verifyOtp}>
                Verify OTP
            </button>

        </div>
    );
}

export default OtpLogin;