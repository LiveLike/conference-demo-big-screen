const createTextPollOption = (textQuizOption) => {
    return `
<div class="col-md-12">
    <div class="text-quiz-option">
        <p class="text-quiz-option-description">${textQuizOption.description}</p>
    </div>
</div>
`;
};

const getTextPollOptions = (options) => {
    let result = "";
    for (let i = 0; i < options.length; i++) {
        result += createTextPollOption(options[i]);
    }
    return result;
};

const getTextPoll = (widget) => {
    return `
    <div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="text-quiz-container">
            <div class="text-quiz-options">
                <div class="row">
                    ${getTextPollOptions(widget.options)}
                </div>
            </div>
        </div>
    </div>
</div>
    `;
};

const createImagePollOption = (imageQuizOption) => {
    return `
<div class="col-md-6">
    <div class="image-quiz-option">
        <img class="image-quiz-option-img"
            src="${imageQuizOption.image_url}"
            alt="">
            <p class="image-quiz-option-description">${imageQuizOption.description}</p>
    </div>
</div>
`;
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

const getEmojiSlider = (widget) => {
    return `
    <div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="emoji-slider-container">
            <livelike-emoji-slider widgetid="${widget.id}"></livelike-emoji-slider>
        </div>
    </div>
</div>
    `;
};

const getCheerMeter = (widget) => {
    return `
    <div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="cheer-meter-container">
            <livelike-cheer-meter widgetid="${widget.id}"></livelike-cheer-meter>
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
    addWidgetInContainer(getImagePoll(widget));
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
    if (widget.kind === "image-poll" || widget.kind === "image-quiz" || widget.kind === "image-prediction") {
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
};

const createWidgetEventHandler = (e) => {
    if (e.event === "image-poll-created" || e.event === "image-quiz-created" || e.event === "image-prediction-created") {
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
};

const setupWidgetListener = () => {
    loadLastPublishedWidget(programId);
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
