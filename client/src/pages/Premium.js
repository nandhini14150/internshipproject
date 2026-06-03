import API from "../services/api";

function Premium() {

    const email =
        "vislavathnandhini@gmail.com";

    const upgrade = async (plan) => {

        try {

            // Payment
            const payment =
                await API.post(
                    "/payment/create-order",
                    { plan }
                );

            alert(
                `Payment Success ₹${payment.data.amount}`
            );

            // Upgrade Plan
            const res =
                await API.post(
                    "/plans/upgrade",
                    {
                        email,
                        plan
                    }
                );

            // Send Invoice
            await API.post(
                "/email/invoice",
                {
                    email,
                    plan
                }
            );

            // Save user plan
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email,
                    plan
                })
            );

            alert(
                `${res.data.message}\nInvoice Sent`
            );

            window.location.reload();

        } catch (error) {

            alert(
                "Payment Failed"
            );

            console.log(error);
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>
                🚀 Upgrade Plan
            </h2>

            <button
                onClick={() =>
                    upgrade("Bronze")
                }
            >
                Bronze ₹10
            </button>

            <br />
            <br />

            <button
                onClick={() =>
                    upgrade("Silver")
                }
            >
                Silver ₹50
            </button>

            <br />
            <br />

            <button
                onClick={() =>
                    upgrade("Gold")
                }
            >
                Gold ₹100
            </button>

        </div>
    );
}

export default Premium;