const createTextPollOption = (textQuizOption) => {
    return `
<div class="col-md-12">
    <div class="text-quiz-option">
        <p class="text-quiz-option-description">${textQuizOption.description}</p>
    </div>
</div>
`;
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

const createImageQuizWidget = (widget) => {
    console.log(widget.id);
    return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-image-quiz widgetid="${widget.id}"></livelike-image-quiz>
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

const getAlert = (widget) => {
    return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.title}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="cheer-meter-container">
            <livelike-alert widgetid="${widget.id}"></livelike-alert>
        </div>
    </div>
</div>
`;
};

const getVideoAlert = (widget) => {
    return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.title}</span>
        </div>
    </div>
    <div class="widget-body">
        <div class="cheer-meter-container">
            <livelike-video-alert widgetid="${widget.id}"></livelike-video-alert>
        </div>
    </div>
</div>
`;
};