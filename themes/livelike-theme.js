const globalPollStyle = {
    header: {
        borderColor: "00aaff",
        borderWidth: 1,
        fontColor: "ffffff",
        background: {
            color: "00aaff",
            format: "fill"
        },
        margin: [10, 0, 0, 0],
    },
    body: {
        borderColor: "00aaff",
        borderWidth: 1,
        fontColor: "000000",
        background: {
            color: "000000",
            format: "fill"
        },
        margin: [0, 0, 10, 0]
    },
    selectedOption: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            color: "ffffff",
            format: "fill"
        },
        margin: [10, 0, 10, 0]
    },
    correctOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
        margin: [10, 0, 10, 0]
    },
    incorrectOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "ffffff",
            format: "fill"
        },
        margin: [10, 0, 10, 0]
    },
    unselectedOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
        margin: [10, 0, 10, 0]
    },
    selectedOptionBar: {
        borderColor: "ff0000",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    interactiveTrackLeft: {
        background: {
            color: "ffffff",
            format: "fill"
        },
    },
    interactiveTrackRight: {
        background: {
            color: "44bbff",
            format: "fill"
        },
    },
    timer: {
        borderColor: "000000",
        fontWeight: "normal",
        borderWidth: 0,
        background: {
            "color": "00000000",
            "format": "fill"
        },
        fontColor: "000000"
    },
};

const setupTheme = () => {
    LiveLike.applyTheme({
        widgets: {
            alert: alertTheme,
            imageSlider: imageSliderTheme,
            cheerMeter: cheerMeterTheme,
            poll: pollTheme,
            quiz: quizTheme,
            prediction: predictionTheme,
        }
    });
};