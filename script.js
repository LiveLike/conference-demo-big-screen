const getWidgetsContainer = () => {
  return document.querySelector('.widgets-container');
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

const setAlertWidget = (widget) => {
  addWidgetInContainer(getAlert(widget));
};

const setVideoAlertWidget = (widget) => {
  addWidgetInContainer(getVideoAlert(widget));
};

const getLastPublishedWidget = async () => {
  var response = await LiveLike.getPostedWidgets({ programId: programId });
  if (response.widgets && response.widgets.length) {
    return response.widgets[0];
  }
};

const loadLastPublishedWidget = async () => {
  const lastPublishedWidget = await getLastPublishedWidget();
  if (lastPublishedWidget) {
    widgetHandler(lastPublishedWidget);
  }
};

const widgetHandler = (widget) => {
  console.log(widget);
  if (widget.kind === 'text-poll') {
    addWidgetInContainer(createTextPollWidget(widget));
  }
  if (widget.kind === 'text-quiz') {
    addWidgetInContainer(createTextQuizWidget(widget));
  }
  if (widget.kind === 'text-prediction') {
    addWidgetInContainer(createTextPredictionWidget(widget));
  }
  if (widget.kind === 'image-poll') {
    addWidgetInContainer(createImagePollWidget(widget));
  }
  if (widget.kind === 'image-quiz') {
    addWidgetInContainer(createImageQuizWidget(widget));
  }
  if (widget.kind === 'image-prediction') {
    addWidgetInContainer(createImagePredictionWidget(widget));
  }
  if (widget.kind === 'emoji-slider') {
    addWidgetInContainer(getEmojiSlider(widget));
  }
  if (widget.kind === 'cheer-meter') {
    addWidgetInContainer(getCheerMeter(widget));
  }
  if (widget.kind === 'alert') {
    setAlertWidget(widget);
  }
  if (widget.kind === 'video-alert') {
    setVideoAlertWidget(widget);
  }
};

const createWidgetEventHandler = (e) => {
  console.log(e.event);
  widgetHandler(e.widgetPayload);
};

const setupWidgetListener = () => {
  loadLastPublishedWidget(programId);
  LiveLike.addWidgetListener(
    { programId: programId },
    createWidgetEventHandler
  );
};

const resultsMode = ({ widget }) => {
  widget.hide_dismiss_button = true;
  widget.results({ timeout: 5000 }).then(widget.expire).then(widget.finished);
};

const initLiveLike = (clientId, program) => {
  return LiveLike.init({
    clientId: clientId,
  }).then((profile) => {
    setupTheme();
    setupWidgetListener();
    LiveLike.registerWidgetMode('results-mode', resultsMode);
  });
};

const init = (clientId, programId) => {
  fetch('https://cf-blast.livelikecdn.com/api/v1/programs/' + programId + '/')
    .then((p) => p.json())
    .then((program) => {
      return initLiveLike(clientId, program);
    });
};
