let lastWidget = null;
const widgetContainer = document.querySelector('livelike-widgets');
const getWidgetsContainer = () => {
  return document.querySelector('livelike-widgets');
};

const getBarcodeContainer = () => {
  return document.querySelector('.barcode-container');
};

const cleanWidgetsContainer = () => {
  let childNode = widgetsContainer.lastElementChild;
  while (childNode) {
    widgetsContainer.removeChild(childNode);
    childNode = widgetsContainer.lastElementChild;
  }
};

const addWidgetInContainer = (widget) => {
  var widgetsContainer = getWidgetsContainer();
  widgetsContainer.createSyncWidget({
    id: widget.id,
    kind: widget.kind,
    mode: 'timeline',
    initialLoad: true,
  });
};

const setAlertWidget = (widget) => {
  addWidgetInContainer(getAlert(widget));
};

const setVideoAlertWidget = (widget) => {
  addWidgetInContainer(getVideoAlert(widget));
};

const getLastPublishedWidget = async (programId) => {
  var response = await LiveLike.getPostedWidgets({ programId: programId });
  if (response.widgets && response.widgets.length) {
    return response.widgets[0];
  }
};

const loadLastPublishedWidget = async (programId) => {
  const lastPublishedWidget = await getLastPublishedWidget(programId);
  if (lastPublishedWidget) {
    var barcodeContainer = getBarcodeContainer();
    barcodeContainer.innerHTML = '';
    widgetContainer.showWidget({
      widgetPayload: lastPublishedWidget,
      initialLoad: true,
    });
  }
};
// widgetHandler(lastPublishedWidget);
//   }
// };

// const widgetHandler = (widget) => {
//   console.log(widget);
//   if (widget.kind === 'text-poll') {
//     addWidgetInContainer(createTextPollWidget(widget));
//   }
//   if (widget.kind === 'text-quiz') {
//     addWidgetInContainer(createTextQuizWidget(widget));
//   }
//   if (widget.kind === 'text-prediction') {
//     addWidgetInContainer(createTextPredictionWidget(widget));
//   }
//   if (widget.kind === 'image-poll') {
//     addWidgetInContainer(createImagePollWidget(widget));
//   }
//   if (widget.kind === 'image-quiz') {
//     addWidgetInContainer(createImageQuizWidget(widget));
//   }
//   if (widget.kind === 'image-prediction') {
//     addWidgetInContainer(createImagePredictionWidget(widget));
//   }
//   if (widget.kind === 'emoji-slider') {
//     addWidgetInContainer(getEmojiSlider(widget));
//   }
//   if (widget.kind === 'cheer-meter') {
//     addWidgetInContainer(getCheerMeter(widget));
//   }
//   if (widget.kind === 'alert') {
//     setAlertWidget(widget);
//   }
//   if (widget.kind === 'video-alert') {
//     setVideoAlertWidget(widget);
//   }
// };

const createWidgetEventHandler = (e) => {
  console.log(e.event);
  //   widgetHandler(e.widgetPayload);
  //   widgetContainer.showWidget({
  //     widgetPayload: e.widgetPayload,
  //     initialLoad: true,
  //   });
};

const setupWidgetListener = () => {
  loadLastPublishedWidget(programId);
  LiveLike.addWidgetListener(
    { programId: programId },
    createWidgetEventHandler
  );
};

const setupLeaderboard = (program) => {
  const buildLeaderboard = (leaderboardId) => {
    LiveLike.getLeaderboardEntries({
      leaderboardId,
    }).then((lb) => {
      const lbContainer = document.querySelector(
        '.leaderboard-entries-container'
      );

      // If leaderboard items already exist, remove them to re-build on leaderboard update
      lbContainer.children.length > 0 &&
        Array.from(lbContainer.children).forEach((el) => el.remove());

      // Loop through leaderboard entries to create list items for each entry
      lb.entries = lb.entries.slice(0, 8);
      lb.entries.forEach((entry) => {
        const entryRow = document.createElement('tr');
        entryRow.setAttribute('class', 'list-item');
        entryRow.innerHTML = `
            <td class="rank">${entry.rank}</td>
            <td class="name">${entry.profile_nickname}</td>
            <td class="pts">${entry.score}</td>
          `;
        lbContainer.appendChild(entryRow);
      });
    });
  };
  const leaderboardId = '9af81022-8a85-4511-bb7d-2b74934efb93';
  if (leaderboardId) {
    buildLeaderboard(leaderboardId);
    // When a widget is dismissed, we update the leaderboard to show updated ranks and points
    document.addEventListener('beforewidgetdetached', () => {
      buildLeaderboard(leaderboardId);
    });
  }
};

function resultsMode({ widget }) {
  widget.hide_dismiss_button = true;
  widget.hideVoteInResults = false;
  if (lastWidget) {
    return widgetContainer
      .detach(widgetContainer.firstChild)
      .then(() => widgetContainer.attach(lastWidget))
      .then(() => {
        lastWidget = widget;
        return widget.results({ timeout: null });
      });
  }
  return widgetContainer.attach(widget).then(() => {
    lastWidget = widget;
    return widget.results({ timeout: null });
  });
}

const initLiveLike = (clientId, program) => {
  return LiveLike.init({
    clientId: clientId,
  }).then((profile) => {
    setupTheme();
    setupWidgetListener();
    LiveLike.registerWidgetMode('results', resultsMode);
    setupLeaderboard(program);
  });
};

const init = (clientId, programId) => {
  fetch('https://cf-blast.livelikecdn.com/api/v1/programs/' + programId + '/')
    .then((p) => p.json())
    .then((program) => {
      return initLiveLike(clientId, program);
    });
};
