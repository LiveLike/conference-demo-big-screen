const globalWidgetStyle = {
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
            color: "dedede",
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
    },
    correctOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    incorrectOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    unselectedOptionBar: {
        borderColor: "00aaff",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
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
    }
};

const setupTheme = () => {
    LiveLike.applyTheme({
        widgets: {
            imageSlider: {
                header: {
                    fontColor: "000000",
                    background: {
                        color: "000000",
                        format: "fill"
                    }
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
                }
            },
            cheerMeter: {
                header: {
                    fontColor: "000000",
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
                body: {
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
            },
        }
    });
};