import Colors from "./colors";
import vi$ from "./utilities";

export default function Liveness(VoiceItObj) {
  const modal = VoiceItObj.modal;
  const LivenessRef = this;
  LivenessRef.oldCircles = [];
  LivenessRef.drawCircle = function(testType) {
    switch (testType) {
      case "FACE_UP":
      modal.updateProgressCircle(
        modal.domRef.progressCircle,
        0.25,
        "#FBC132"
      );
      vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(315deg)";
      LivenessRef.oldCircles[0] = 0.25;
      LivenessRef.oldCircles[1] = "rotate(315deg)";
        break;
      case "FACE_DOWN":
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          0.25,
          "#FBC132"
        );
        vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(135deg)";
        LivenessRef.oldCircles[0] = 0.25;
        LivenessRef.oldCircles[1] = "rotate(135deg)";
        break;
      case "FACE_TILT_RIGHT":
      modal.updateProgressCircle(
        modal.domRef.progressCircle,
        0.25,
        "#FBC132"
      );
      vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(22.5deg)";
      LivenessRef.oldCircles[0] = 0.25;
      LivenessRef.oldCircles[1] = "rotate(22.5deg)";
      break;
      case "FACE_RIGHT":
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          0.25,
          "#FBC132"
        );
        vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(45deg)";
        LivenessRef.oldCircles[0] = 0.25;
        LivenessRef.oldCircles[1] = "rotate(45deg)";
        break;
      case "FACE_TILT_LEFT":
      modal.updateProgressCircle(
        modal.domRef.progressCircle,
        0.25,
        "#FBC132"
      );
      vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(247.5deg)";
      LivenessRef.oldCircles[0] = 0.25;
      LivenessRef.oldCircles[1] = "rotate(247.5deg)";
      break;
      case "FACE_LEFT":
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          0.25,
          "#FBC132"
        );
        vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(220deg)";
        LivenessRef.oldCircles[0] = 0.25;
        LivenessRef.oldCircles[1] = "rotate(220deg)";
        break;
      case "SMILE":
        modal.updateProgressCircle(modal.domRef.progressCircle, 1.0, "#FBC132");
        vi$.qs(modal.domRef.progressCircle).style.transform = "rotate(0deg)";
        LivenessRef.oldCircles[0] = 1.0;
        LivenessRef.oldCircles[1] = "rotate(0deg)";
        break;
      default:
    }
  };

  LivenessRef.redrawCircle = function(testType) {
    switch (testType) {
      case 0:
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          LivenessRef.oldCircles[0],
          Colors.MAIN_THEME_COLOR
        );
        vi$.qs(modal.domRef.progressCircle).style.transform =
          LivenessRef.oldCircles[1];
        setTimeout(function() {
          modal.hideProgressCircle(300, function() {
            modal.updateProgressCircle(
              modal.domRef.progressCircle,
              0.25,
              "#FBC132"
            );
            vi$.qs(modal.domRef.progressCircle).style.transform =
              "rotate(135deg)";
            LivenessRef.oldCircles[0] = 0.25;
            LivenessRef.oldCircles[1] = "rotate(135deg)";
            modal.revealProgressCircle(300);
          });
        }, 2000);
        break;
      case 1:
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          LivenessRef.oldCircles[0],
          Colors.MAIN_THEME_COLOR
        );
        vi$.qs(modal.domRef.progressCircle).style.transform =
          LivenessRef.oldCircles[1];
        setTimeout(function() {
          modal.hideProgressCircle(300, function() {
            modal.updateProgressCircle(
              modal.domRef.progressCircle,
              0.25,
              "#FBC132"
            );
            vi$.qs(modal.domRef.progressCircle).style.transform =
              "rotate(45deg)";
            LivenessRef.oldCircles[0] = 0.25;
            LivenessRef.oldCircles[1] = "rotate(45deg)";
            modal.revealProgressCircle(300);
          });
        }, 2000);
        break;
      case 2:
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          LivenessRef.oldCircles[0],
          Colors.MAIN_THEME_COLOR
        );
        vi$.qs(modal.domRef.progressCircle).style.transform =
          LivenessRef.oldCircles[1];
        setTimeout(function() {
          modal.hideProgressCircle(300, function() {
            modal.updateProgressCircle(
              modal.domRef.progressCircle,
              0.25,
              "#FBC132"
            );
            vi$.qs(modal.domRef.progressCircle).style.transform =
              "rotate(220deg)";
            LivenessRef.oldCircles[0] = 0.25;
            LivenessRef.oldCircles[1] = "rotate(220deg)";
            modal.revealProgressCircle(300);
          });
        }, 2000);
        break;
      case 3:
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          LivenessRef.oldCircles[0],
          Colors.MAIN_THEME_COLOR
        );
        vi$.qs(modal.domRef.progressCircle).style.transform =
          LivenessRef.oldCircles[1];
        setTimeout(function() {
          modal.displayMessage(LivenessRef.prompts.getPrompt("SMILE"));
          modal.hideProgressCircle(300, function() {
            modal.updateProgressCircle(
              modal.domRef.progressCircle,
              1.0,
              "#FBC132"
            );
            LivenessRef.oldCircles[0] = 1.0;
            LivenessRef.oldCircles[1] = "rotate(0deg)";
            modal.revealProgressCircle(300);
          });
        }, 300);
        break;
      case 4:
        modal.updateProgressCircle(
          modal.domRef.progressCircle,
          LivenessRef.oldCircles[0],
          Colors.MAIN_THEME_COLOR
        );
        vi$.qs(modal.domRef.progressCircle).style.transform =
          LivenessRef.oldCircles[1];
        setTimeout(function() {
          modal.displayMessage(LivenessRef.prompts.getPrompt("YAWN"));
          modal.hideProgressCircle(300, function() {
            modal.updateProgressCircle(
              modal.domRef.progressCircle,
              1.0,
              "#FBC132"
            );
            LivenessRef.oldCircles[0] = 1.0;
            LivenessRef.oldCircles[1] = "rotate(0deg)";
            modal.revealProgressCircle(300);
          });
        }, 300);
        break;
      default:
    }
  };
}
