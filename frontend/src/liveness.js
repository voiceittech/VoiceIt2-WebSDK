import vi$ from "./utilities";
import Prompts from "./prompts";
// import LivenessMath from "./livenessMath";
// const LIVENESS_TEST_TIMEOUT = 5200;
import Colors from "./colors";

export default function Liveness(VoiceItObj) {
  const LivenessRef = this;
  const modal = VoiceItObj.modal;
  const currentPhrase = VoiceItObj.phrase;
  const _isWebAssemblySupported = vi$.isWebAssemblySupported();
  LivenessRef.animationId = 0;
  LivenessRef.manyfaces = false;
  LivenessRef.livenessStarted = false;
  LivenessRef.finished = false;

  // Refactor prompts to be prop on modal object
  LivenessRef.prompts = new Prompts();
  LivenessRef.cancel = false;
  LivenessRef.allPassed = false;
  LivenessRef.picturesCaptured = false;
  LivenessRef.continueToVoice = true;
  LivenessRef.oldCircles = [];
  LivenessRef.setup = false;
  LivenessRef.imageDataCtx = modal.domRef.imageCanvas.getContext("2d");
  LivenessRef.faceManager = undefined;
  LivenessRef.resolution = null;
  LivenessRef.test;

  LivenessRef.startRecordingLiveness = function(testType) {
    console.log("started Liveness");
  };

  LivenessRef.tryAgain = function(turnBack) {
    LivenessRef.testIndex =
      LivenessRef.testIndex >= LivenessRef.tests.length - 1
        ? 0
        : LivenessRef.testIndex + 1;
    LivenessRef.currentTest = LivenessRef.tests[LivenessRef.testIndex];
    LivenessRef.livenessRetest(LivenessRef.currentTest);
    LivenessRef.testTimeStart = Date.now();
    modal.hideProgressCircle(300);
    modal.darkenCircle(true);
    modal.displayMessage(
      LivenessRef.prompts.getPrompt(
        turnBack ? "LIVENESS_TRY_AGAIN_AND_TURN_BACK" : "LIVENESS_TRY_AGAIN"
      )
    );
    LivenessRef.passed.value = false;
  };

  LivenessRef.passedLivenessTest = function() {
    LivenessRef.cancel = true;
    // Show waiting, post liveness success
    modal.updateProgressCircle(
      modal.domRef.progressCircle,
      LivenessRef.oldCircles[0],
      Colors.MAIN_THEME_COLOR
    );
    vi$.qs(modal.domRef.progressCircle).style.transform =
      LivenessRef.oldCircles[1];
  };

  LivenessRef.passedAllFaceLivenessTests = function() {
    LivenessRef.allPassed = true;
    modal.updateProgressCircle(
      modal.domRef.progressCircle,
      LivenessRef.oldCircles[0],
      Colors.MAIN_THEME_COLOR
    );
    vi$.qs(modal.domRef.progressCircle).style.transform =
      LivenessRef.oldCircles[1];
    setTimeout(function() {
      modal.hideProgressCircle(300, function() {
        modal.domRef.progressCircle.style.display = "none";
      });
    }, 300);
    modal.darkenCircle(true);
    LivenessRef.cancel = true;
    if (LivenessRef.allPassed && LivenessRef.picturesCaptured) {
      VoiceItObj.onFinishLivenessFaceVerification();
    }
  };

  LivenessRef.passedAllVideoLivenessTests = function() {
    LivenessRef.cancel = true;
    // Show waiting, ready to start video verification post liveness success
    modal.updateProgressCircle(
      modal.domRef.progressCircle,
      LivenessRef.oldCircles[0],
      Colors.MAIN_THEME_COLOR
    );
    vi$.qs(modal.domRef.progressCircle).style.transform =
      LivenessRef.oldCircles[1];
    modal.hideProgressCircle(500, function() {
      modal.domRef.progressCircle.style.display = "none";
    });
  };

  LivenessRef.failedLiveness = function() {
    LivenessRef.continueToVoice = false;
    LivenessRef.cancel = true;
    // Failed liveness
    vi$.fadeOut(modal.domRef.progressCircle, 300, function() {
      modal.domRef.progressCircle.style.display = "none";
    });

    modal.darkenCircle(true);
    modal.displayMessage(LivenessRef.prompts.getPrompt("LIVENESS_FAILED"));
    VoiceItObj.exitOut();
  };

  LivenessRef.livenessRetest = function() {
    LivenessRef.redrawCircle(LivenessRef.currentTest);
    modal.darkenCircle(true);
  };

  LivenessRef.resume = function() {
    LivenessRef.stop = false;
    LivenessRef.setup = true;
    LivenessRef.cancel = false;
    // LivenessRef.trackfaces();
  };

  // TODO: Revisit to make sure everything is necessary and cleared appropriately
  LivenessRef.destroy = function() {
    LivenessRef.cancel = true;
    window.cancelAnimationFrame(LivenessRef.animationId);
    delete LivenessRef.oldCircle;
    modal.domRef.imageCanvas = null;
    delete modal.domRef.imageCanvas;
    LivenessRef.imageDataCtx = null;
    delete LivenessRef.imageDataCtx;
    LivenessRef.test = null;
    delete LivenessRef.test;
  };
}
