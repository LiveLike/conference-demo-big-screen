const widgetHandler = (e) => {
    console.log(e);
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
