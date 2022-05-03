

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

const widgetHandler = (e) => {
    console.log(e.event);
    console.log(e.widgetPayload);
    if (e.event === "image-poll-created" || "image-quiz-created" || "image-prediction-created") {
        console.log(e.widgetPayload.question);
        if (e.widgetPayload.choices) {
            e.widgetPayload.options = e.widgetPayload.choices;
        }
        setImageQuizWidget(e.widgetPayload);
    }
};

const setupWidgetListener = () => {
    LiveLike.addWidgetListener({ programId: programId }, widgetHandler);
};

const initLiveLike = (clientId, program) => {
    return LiveLike.init({
        clientId: clientId,
    }).then((profile) => {
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
