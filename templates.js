const createTextQuizWidget = (widget) => {
  console.log(widget.id);
  return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-text-quiz widgetid="${widget.id}" mode="results-mode"></livelike-text-quiz>
    </div>
</div>
`;
};

const createTextPollWidget = (widget) => {
  console.log(widget.id);
  return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-text-poll widgetid="${widget.id}"></livelike-text-poll>
    </div>
</div>
`;
};

const createTextPredictionWidget = (widget) => {
  console.log(widget.id);
  return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-text-prediction widgetid="${widget.id}"></livelike-text-prediction>
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

const createImagePollWidget = (widget) => {
  console.log(widget.id);
  return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-image-poll widgetid="${widget.id}"></livelike-image-poll>
    </div>
</div>
`;
};

const createImagePredictionWidget = (widget) => {
  console.log(widget.id);
  return `
<div class="widget-container">
    <div class="widget-header">
        <div class="row">
            <span>${widget.question}</span>
        </div>
    </div>
    <div class="widget-body">
        <livelike-image-prediction widgetid="${widget.id}"></livelike-image-prediction>
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
            <livelike-cheer-meter widgetid="${widget.id}" mode="results-mode"></livelike-cheer-meter>
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
