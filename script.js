const getTextPollOptions = (options) => {
    let result = "";
    for (let i = 0; i < options.length; i++) {
        result += createTextPollOption(options[i]);
    }
    return result;
};

const getImagePollOptions = (options) => {
    let result = "";
    for (let i = 0; i < options.length; i++) {
        result += createImagePollOption(options[i]);
    }
    return result;
};

const getImagePoll = (widget) => {
    return `
    <div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="image-quiz-container">
            <div class="image-quiz-options">
                <div class="row">
                    ${getImagePollOptions(widget.options)}
                </div>
            </div>
        </div>
    </div>
</div>
    `;
};

const getWidgetsContainer = () => {
    return document.querySelector(".widgets-container");
};

const cleanWidgetsContainer = () => {
    let childNode = widgetsContainer.lastElementChild;
    while (childNode) {
        widgetsContainer.removeChild(childNode);
        childNode = widgetsContainer.lastElementChild;
    }
};

const addWidgetInContainer = (content) => {
    var widgetsContainer = getWidgetsContainer();
    widgetsContainer.innerHTML = content;
};

const setImageQuizWidget = (widget) => {
    addWidgetInContainer(createImageQuizWidget(widget));
}

const setTextQuizWidget = (widget) => {
    addWidgetInContainer(getTextPoll(widget));
}

const setEmojiSliderWidget = (widget) => {
    addWidgetInContainer(getEmojiSlider(widget));
}

const setCheerMeterWidget = (widget) => {
    addWidgetInContainer(getCheerMeter(widget));
}

const setAlertWidget = (widget)=>{
    addWidgetInContainer(getAlert(widget));
};

const getLastPublishedWidget = async () => {
    var response = await LiveLike.getPostedWidgets({ programId: programId });
    if (response.widgets && response.widgets.length) {
        return response.widgets[0];
    };
}

const loadLastPublishedWidget = async () => {
    const lastPublishedWidget = await getLastPublishedWidget();
    if (lastPublishedWidget) {
        widgetHandler(lastPublishedWidget);
    }
}

const widgetHandler = (widget) => {
    console.log(widget);
    if (widget.kind === "image-poll") {
        if (widget.choices) {
            widget.options = widget.choices;
        }
        setImageQuizWidget(widget);
    }
    if (widget.kind === "image-quiz") {
        if (widget.choices) {
            widget.options = widget.choices;
        }
        setImageQuizWidget(widget);
    }
    if (widget.kind === "image-prediction") {
        if (widget.choices) {
            widget.options = widget.choices;
        }
        setImageQuizWidget(widget);
    }
    if (widget.kind === "text-poll" || widget.kind === "text-quiz" || widget.kind === "text-prediction") {
        if (widget.choices) {
            widget.options = widget.choices;
        }
        setTextQuizWidget(widget);
    }
    if (widget.kind === "emoji-slider") {
        setEmojiSliderWidget(widget);
    }
    if (widget.kind === "cheer-meter") {
        setCheerMeterWidget(widget);
    }
    if(widget.kind === "alert"){
        setAlertWidget(widget);
    }
};

const createWidgetEventHandler = (e) => {
    if (e.event === "image-poll-created") {
        if (e.widgetPayload.choices) {
            e.widgetPayload.options = e.widgetPayload.choices;
        }
        setImageQuizWidget(e.widgetPayload);
    }
    if (e.event === "image-quiz-created") {
        if (e.widgetPayload.choices) {
            e.widgetPayload.options = e.widgetPayload.choices;
        }
        createImageQuizWidget(e.widgetPayload);
    }
    if (e.event === "image-prediction-created") {
        if (e.widgetPayload.choices) {
            e.widgetPayload.options = e.widgetPayload.choices;
        }
        setImageQuizWidget(e.widgetPayload);
    }
    if (e.event === "text-poll-created" || e.event === "text-quiz-created" || e.event === "text-prediction-created") {
        if (e.widgetPayload.choices) {
            e.widgetPayload.options = e.widgetPayload.choices;
        }
        setTextQuizWidget(e.widgetPayload);
    }
    if (e.event === "emoji-slider-created") {
        setEmojiSliderWidget(e.widgetPayload);
    }
    if (e.event === "cheer-meter-created") {
        setCheerMeterWidget(e.widgetPayload);
    }
    if (e.event === "alert-created") {
        setAlertWidget(e.widgetPayload);
    }
};

const setupWidgetListener = () => {
    //loadLastPublishedWidget(programId);
    LiveLike.addWidgetListener({ programId: programId }, createWidgetEventHandler);
};

const initLiveLike = (clientId, program) => {
    return LiveLike.init({
        clientId: clientId,
    }).then((profile) => {
        setupTheme();
        setupWidgetListener();
    });
}

const init = (clientId, programId) => {
    fetch("https://cf-blast.livelikecdn.com/api/v1/programs/" + programId + "/")
        .then((p) => p.json())
        .then((program) => {
            return initLiveLike(clientId, program);
        });
};
